import { ConnectionStatus, ActionType } from '../enums';

export default function (state = [], action): any {

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
            if(!action.payload.state.flags.closedOrError) {
                return { ...state, status: ConnectionStatus.CONNECTED };
            }
            return { ...state, status: ConnectionStatus.DISCONNECTED };

        default:
            return { ...state };
    }
}
