import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import { ActionName } from './actions';
import { ConnectionStatus, CommandStatus } from './enums';
import type {Device} from "./types";

function config(state=[], action) {
    return state;
}

function _mapPrinterProfiles(profiles) {
    return profiles
}

function _mapBaudRates(rates) {

}

function devices(state = [], action): any {

    switch(action.type) {
        case ActionName.REQUEST_DEVICE_CONNECTIONS:
            return { ...state };
        case ActionName.DEVICE_CONNECTION_INFO:
            const opt = action.payload.options;
            return {
                ...state,
                devices: opt.printerProfiles.map( (el, idx):Device => { return {'name':el.name, 'id':el.id}; }),
                baudrates: opt.baudrates.map( (el, idx) => { return {'text':el, 'value':el, 'key':idx }; }),
                ports: opt.ports.map((el, idx) => { return {'text':el, 'value':el, 'key':idx }; }),
                };
        case ActionName.CONNECTING:
            return {
                ...state,
                status: ConnectionStatus.CONNECTING
            };
        case ActionName.CONNECTED:
            return {
                ...state,
                status: ConnectionStatus.CONNECTED
            };
        case ActionName.DISCONNECTING:
            return {
                ...state,
                status: ConnectionStatus.DISCONNECTING
            };
        case ActionName.DISCONNECTED:
            return {
                ...state,
                status: ConnectionStatus.DISCONNECTED
            };
        default:
            return { ...state };
    }
}

function commands(state = [], action) {
    switch(action.type) {
        case ActionName.AVAILABLE_SYSTEM_COMMANDS:
            return {...state};
        // case ActionName.GCODE_COMMANDS_FROM_FILE:
        //     return {
        default:
            return {'available_commands': [
                {command: 'G17 G20 G90 G94 G54', status: CommandStatus.COMPLETED},
                {command: 'G0 Z0.25', status: CommandStatus.COMPLETED},
                {command: 'X-0.5 Y0.', status: CommandStatus.SKIPPED},
                {command: 'Z0.1', status: CommandStatus.ERROR},
                {command: 'G01 Z0. F5.', status: CommandStatus.ACTIVE },
                {command: 'G02 X0. Y0.5 I0.5 J0. F2.5', status: CommandStatus.PENDING },
                {command: 'X0.5 Y0. I0. J-0.5', status: CommandStatus.PENDING },
                {command: 'X0. Y-0.5 I-0.5 J0.', status: CommandStatus.PENDING},
                {command: 'X-0.5 Y0. I0. J0.5', status: CommandStatus.PENDING },
                {command: 'G01 Z0.1 F5.', status: CommandStatus.PENDING },
                {command: 'G00 X0. Y0. Z0.25', status: CommandStatus.PENDING }
                ]};
    }
}

export default combineReducers({
    routing,
    config,
    devices,
    commands
});
