import {ActionType} from "enums";
import {of} from 'rxjs';
import {APIPost,APIGet} from "../octoprint";

import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter} from 'rxjs/operators';

import * as actions from "../action_creators";


export const deviceConnectionsEpic  = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.REQUEST_DEVICE_CONNECTIONS),
        switchMap((action) => {
            let ajax$ = APIGet(`/api/connection`);
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
            let ajax$ = APIPost(`/api/connection`, {
                "command": "connect",
                "port": action.payload.port,
                "baudrate": action.payload.baudrate,
                "printerProfile": action.payload.device
            });
            return ajax$.pipe(
                map(actions.deviceConnected),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const disconnectFromDeviceEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.DISCONNECT_FROM_DEVICE),
        switchMap((action) => {
            let ajax$ = APIPost(`/api/connection`, {
                'command':'disconnect'
            });
            return ajax$.pipe(
                map(actions.deviceDisconnected),
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

