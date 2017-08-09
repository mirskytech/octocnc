import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import { ConnectionStatus, CommandStatus, ActionType } from 'enums';
import type {Device} from "./types";

function config(state=[], action) {
    return state;
}

function _mapPrinterProfiles(profiles) {
    return profiles
}

function _mapBaudRates(rates) {

}

function position(state = [], action) : any {

    switch(action.type) {
        case ActionType.POSITION_UPDATE:
            return {
                X: action.payload.x,
                Y: action.payload.y,
                Z: action.payload.z
            };
        default:
            return { ...state };
    }
}

function devices(state = [], action): any {

    switch(action.type) {
        case ActionType.REQUEST_DEVICE_CONNECTIONS:
            return { ...state };
        case ActionType.DEVICE_CONNECTION_INFO:
            const opt = action.payload.options;
            return {
                ...state,
                devices: opt.printerProfiles.map( (el, idx):Device => { return {'name':el.name, 'id':el.id}; }),
                baudrates: opt.baudrates.map( (el, idx) => { return {'text':el, 'value':el, 'key':idx }; }),
                ports: opt.ports.map((el, idx) => { return {'text':el, 'value':el, 'key':idx }; }),
                };
        case ActionType.CONNECTING:
            return {
                ...state,
                status: ConnectionStatus.CONNECTING
            };
        case ActionType.CONNECTED:
            return {
                ...state,
                status: ConnectionStatus.CONNECTED
            };
        case ActionType.DISCONNECTING:
            return {
                ...state,
                status: ConnectionStatus.DISCONNECTING
            };
        case ActionType.DISCONNECTED:
            return {
                ...state,
                status: ConnectionStatus.DISCONNECTED
            };
        case ActionType.SOCKET_HISTORY:
            console.log('history');
            console.log(action.payload);
            if(!action.payload.state.flags.closedOrError) {
                return {
                    ...state,
                    status: ConnectionStatus.CONNECTED
                }
            }
        default:
            return { ...state };
    }
}

function commands(state = [], action) {
    switch(action.type) {
        case ActionType.AVAILABLE_SYSTEM_COMMANDS:
            return {...state};
        // case ActionType.GCODE_COMMANDS_FROM_FILE:
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
    position,
    config,
    devices,
    commands
});
