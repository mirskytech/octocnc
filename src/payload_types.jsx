export type DeviceConnections = {
    devices: Array<any>
};

export type GCodeUpdate = {
    gcode: string
}

export type WebsocketAction = {
    type: 'WEBSOCKET_MESSAGE',
    payload: {
        type: number,
        data: any
    }
}
export type Action = WebsocketAction | {
    type: 'CONNECTION_MESSAGE',
    payload: ConnectionMessage
} | {
    type: 'GCODE_UPDATE',
    payload: GCodeUpdate
};