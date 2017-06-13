import {Enum} from 'enumify';

export class ConnectionState extends Enum {}

ConnectionState.initEnum([
    'CONNECTING',
    'CONNECTED',
    'DISCONNECTING',
    'DISCONNECTED'
]);