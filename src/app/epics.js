// @flow

import {combineEpics} from 'redux-observable';

import {LOCATION_CHANGE} from 'react-router-redux';
import {ajax} from 'rxjs/observable/dom/ajax';
import {of} from 'rxjs/observable/of';
import {timer} from 'rxjs/observable/timer';
import * as actions from "action_creators";
import {ActionType} from "enums";

function mapToAction(actionCreator) {
    return (action) => {
        return actionCreator(action.payload)
    };
}



declare class ReduxObservable<T> extends rxjs$Observable<T> {
     ofType(actionType: string): rxjs$Observable<T>;
}

export default function createRootEpics(socket: WebSocket, initialState: Object) {

    const deviceConnectionsEpic  = (action$) => {

        return action$
            .ofType(ActionType.REQUEST_DEVICE_CONNECTIONS)
            .switchMap((action) => {
                let ajax$ = ajax.getJSON(`/api/connection`, {'X-Api-Key':initialState.config.api_key});
                return ajax$.retry(1).map(actions.deviceConnectionInfo).catch(actions.ajaxError);
            });
    };

    const connectToDeviceEpic = (action$) => {
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
                return ajax$.ignoreElements();

            });
    };

    const disconnectFromDeviceEpic= (action$) => {
        return action$
            .ofType(ActionType.DISCONNECT_FROM_DEVICE)
            .switchMap((action) => {
                let ajax$ = ajax.post(`/api/connection`,
                    JSON.stringify({'command':'disconnect'}),
                    {'X-Api-Key':initialState.config.api_key, 'Content-Type':'application/json'});
                return ajax$.ignoreElements();
            });
    };

    const requestSystemCommandsEpic = (action$) => {
        return action$
            .ofType(ActionType.REQUEST_SYSTEM_COMMANDS)
            .switchMap((action) => {
                let ajax$ = ajax.getJSON(`/api/system/commands/core`, {'X-Api-Key':initialState.config.api_key});
                return ajax$.retry(1).map(actions.availableSystemCommands).catch(actions.ajaxError);
            });
    };

    const executeCommandEpic = (action$) => {
        return action$
            .ofType(ActionType.EXECUTE_COMMAND)
            .switchMap((action) => {
                let ajax$ = ajax.post(`/api/printer/command`,
                    JSON.stringify({'command': action.payload}),
                    {'X-Api-Key': initialState.config.api_key, 'Content-Type': 'application/json'});
                return ajax$.ignoreElements();
            });
    };

    return combineEpics(
        deviceConnectionsEpic,
        connectToDeviceEpic,
        disconnectFromDeviceEpic,
        requestSystemCommandsEpic,
        executeCommandEpic
    );
};
