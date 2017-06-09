// @flow

import Websocket from './lib/websocket';
import { websocketMessage } from './action_creators';

export default function configureWebsocket(ws_path: string) {
    const socket = new Websocket(ws_path, null, { maxReconnectInterval: 10000 });


    socket.listen = function listen(dispatch) {

        // Send incoming websocket messages through redux
        socket.onmessage = function (data: any) {
            dispatch(websocketMessage(data));
        };
    };

    return socket;
}
