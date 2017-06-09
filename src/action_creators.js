// @flow
import {Action} from "./payload_types";
import { ActionName } from "./actions";

export const requestDeviceConnections = (payload: any): Action => ({
    type: ActionName.REQUEST_DEVICE_CONNECTIONS,
    payload: payload
});

export const deviceConnectionInfo = (devices: any/*types.DeviceConnections*/) : Action => ({
    type: ActionName.DEVICE_CONNECTION_INFO,
    payload: devices
});

export const ajaxError = (info: Error): Action => ({
    type: ActionName.AJAX_ERROR,
    payload: info
});
