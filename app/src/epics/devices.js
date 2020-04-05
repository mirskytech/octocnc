import {ActionType} from "enums";
import {of} from 'rxjs';
import {APIPost,APIGet} from "../octoprint";

import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter, mergeMap, delay} from 'rxjs/operators';

import * as actions from "../action_creators";


export const deviceConnectionsEpic  = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.REQUEST_DEVICE_CONNECTIONS),
        switchMap((action) => {
            let ajax$ = APIGet(`/api/connection`, store.value.api_key);
            return ajax$.pipe(
                retry(1),
                mergeMap(data => of(actions.deviceConnectionInfo(data), actions.getDeviceState())),
                catchError(
                    error => {
                        if(error.status === 403) {
                            console.log("logout and then try to retrieve the device connections");
                            return of(actions.authLogout()).pipe(
                                delay(3000),
                                map(actions.requestDeviceConnections)
                            );
                        }
                        return of(actions.ajaxError(error));
                    }
                )
            );
        })
    );
};

export const deviceStateEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.GET_DEVICE_STATE),
        switchMap((action) => {
            let ajax$ = APIGet(`/plugin/octocnc/device/state`, store.value.api_key);
            return ajax$.pipe(
                retry(1),
                map(actions.deviceState),
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
            },
            store.value.api_key);
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
            },
            store.value.api_key);
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

