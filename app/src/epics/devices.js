import {ActionType} from "enums";
import {ajax} from 'rxjs/observable/dom/ajax';
import {of} from 'rxjs/observable/of';

import * as actions from "action_creators";


export const deviceConnectionsEpic  = (action$, store, {socket, initialState}) => {
    return action$
        .ofType(ActionType.REQUEST_DEVICE_CONNECTIONS)
        .switchMap((action) => {
            let ajax$ = ajax.getJSON(`/api/connection`, {'X-Api-Key':initialState.config.api_key});
            return ajax$.retry(1).map(actions.deviceConnectionInfo).catch(error => of(actions.ajaxError(error)));
        });
};

export const connectToDeviceEpic = (action$, store, {socket, initialState}) => {
    return action$
        .ofType(ActionType.CONNECT_TO_DEVICE)
        .switchMap((action) => {
            let ajax$ = ajax.post(`/api/connection`,
                JSON.stringify(
                {"command": "connect",
                "port": action.payload.port,
                "baudrate": action.payload.baudrate,
                "printerProfile": action.payload.device}),
                {'X-Api-Key':initialState.config.api_key, 'Content-Type':'application/json'}
            );
            return ajax$.ignoreElements().catch(error => of(actions.ajaxError(error)));

        });
};

export const disconnectFromDeviceEpic = (action$, store, {socket, initialState}) => {
    return action$
        .ofType(ActionType.DISCONNECT_FROM_DEVICE)
        .switchMap((action) => {
            let ajax$ = ajax.post(`/api/connection`,
                JSON.stringify({'command':'disconnect'}),
                {'X-Api-Key':initialState.config.api_key, 'Content-Type':'application/json'});
            return ajax$.ignoreElements().catch(error => of(actions.ajaxError(error)));
        });
};

export const determineConnectedDeviceEpic = (action$, store, { socket, initialState}) => {
    return action$
        .filter(action => {
            return (action.type === ActionType.SOCKET_HISTORY && !action.payload.state.flags.closedOrError) || action.type === ActionType.CONNECTED
        }).map(actions.requestDeviceConnections).catch(error => of(actions.ajaxError(error)));
};

