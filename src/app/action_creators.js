// @flow
import {Action} from "./payload_types";
import { ActionName } from "./actions";


export type WebsocketAction = {
    type: 'WEBSOCKET_MESSAGE',
    payload: {
        type: number,
        data: any
    }
}


export const requestDeviceConnections = (payload: any): Action => ({
    type: ActionName.REQUEST_DEVICE_CONNECTIONS,
    payload: payload
});

export const deviceConnectionInfo = (devices: any/*types.DeviceConnections*/) : Action => ({
    type: ActionName.DEVICE_CONNECTION_INFO,
    payload: devices
});

export const connectToDevice = (port: string, device: string, speed: string) : Action => ({
    type: ActionName.CONNECT_TO_DEVICE,
    payload: {
        port: port,
        device: device,
        speed: speed
    }
});

export const disconnectFromDevice = () : Action => ({
    type: ActionName.DISCONNECT_FROM_DEVICE
});

export const deviceError = (info: any): Action => ({
    type: ActionName.DEVICE_ERROR,
    payload: info
});

export const ajaxError = (info: Error): Action => ({
    type: ActionName.AJAX_ERROR,
    payload: info
});

export const requestSystemCommands = (): Action => ({
    type: ActionName.REQUEST_SYSTEM_COMMANDS
});

export const availableSystemCommands = (info: any): Action => ({
    type: ActionName.AVAILABLE_SYSTEM_COMMANDS,
    payload: info
});