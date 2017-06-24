// @flow

import {CommandStatus} from "./enums";
import {ActionName} from "./actions";

export type Device = {
    name: string,
    id: string
};


export type DeviceConnections = {
    devices: Array<Device>
};

export type GCodeUpdate = {
    gcode: string
};

export type Command = {
    command: string,
    status: CommandStatus
}


export type Action = {
    type: ActionName,
    payload: any
};

