import {Enum} from 'enumify';

export class ConnectionState extends Enum {}

ConnectionState.initEnum({
    'CONNECTING':{},
    'CONNECTED':{},
    'DISCONNECTING':{},
    'DISCONNECTED':{}
});

export class Colors extends Enum {}

Colors.initEnum({
    'lightBlue': { get color() { return '#6FC0DE';} },
    'darkBlue' : { get color() { return '#3A7A91';} },
    'lightGray': { get color() { return '#F0F0F0';} }
});