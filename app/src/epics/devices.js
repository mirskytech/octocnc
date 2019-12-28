import {ActionType} from "enums";
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';

import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter} from 'rxjs/operators';

import * as actions from "action_creators";


export const deviceConnectionsEpic  = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.REQUEST_DEVICE_CONNECTIONS),
        switchMap((action) => {
            let ajax$ = ajax.getJSON(`/api/connection`, {'X-Api-Key':initialState.config.api_key});
            return ajax$.pipe(
                retry(1),
                map(actions.deviceConnectionInfo),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const connectToDeviceEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.CONNECT_TO_DEVICE),
        switchMap((action) => {
            let ajax$ = ajax.post(`/api/connection`,
                JSON.stringify(
                {"command": "connect",
                "port": action.payload.port,
                "baudrate": action.payload.baudrate,
                "printerProfile": action.payload.device}),
                {'X-Api-Key':initialState.config.api_key, 'Content-Type':'application/json'}
            );
            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const disconnectFromDeviceEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.DISCONNECT_FROM_DEVICE),
        switchMap((action) => {
            let ajax$ = ajax.post(`/api/connection`,
                JSON.stringify({'command':'disconnect'}),
                {'X-Api-Key':initialState.config.api_key, 'Content-Type':'application/json'});
            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const determineConnectedDeviceEpic = (action$, store, { socket, initialState}) => {
    return action$.pipe(
        filter(action => {
            return (action.type === ActionType.SOCKET_HISTORY && !action.payload.state.flags.closedOrError) || action.type === ActionType.CONNECTED
        }),
        map(actions.requestDeviceConnections),
        catchError(error => of(actions.ajaxError(error)))
    );
};

