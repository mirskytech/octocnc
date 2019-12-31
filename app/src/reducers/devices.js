import { ConnectionStatus, ActionType } from '../enums';

export default function (state = [], action): any {

    switch(action.type) {
        case ActionType.REQUEST_DEVICE_CONNECTIONS:
            return { ...state };
        case ActionType.DEVICE_CONNECTION_INFO:

            let current = {};

            let status = ConnectionStatus.DISCONNECTED;

            if(action.payload.current.state !== "Closed") {
                current = {
                    device: action.payload.current.printerProfile,
                    port: action.payload.current.port,
                    baudrate: action.payload.current.baudrate
                };
                status = ConnectionStatus.CONNECTED;
            }

            let available = {};
            if(action.payload.options !== undefined) {
                const opt = action.payload.options;

                available = {
                    devices: opt.printerProfiles.map((el, idx) => {
                        return {'name': el.name, 'id': el.id};
                    }),
                    baudrates: opt.baudrates.map((el, idx) => {
                        return {'text': el, 'value': el, 'key': idx};
                    }),
                    ports: opt.ports.map((el, idx) => {
                        return {'text': el, 'value': el, 'key': idx};
                    })
                }
            }

            return {
                ...state,
                status: status,
                ...available,
                current: current,

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
