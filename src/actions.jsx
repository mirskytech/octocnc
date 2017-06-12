import {Enum} from 'enumify';

export class ActionName extends Enum {}

ActionName.initEnum([
    'REQUEST_DEVICE_CONNECTIONS',
    'DEVICE_CONNECTION_INFO',
    'AJAX_ERROR',
    'CONNECT_TO_DEVICE',
    'DISCONNECTING',
    'DISCONNECTED',
    'CONNECTING',
    'CONNECTED'
]);
