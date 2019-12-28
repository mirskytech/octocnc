import {Enum} from 'enumify';
import React from 'react';

export class ActionType extends Enum {}

// use the object init format. seems that jetbrains can tab complete then
ActionType.initEnum({
    'REQUEST_DEVICE_CONNECTIONS': {},
    'DEVICE_CONNECTION_INFO':{},
    'AJAX_ERROR':{},
    'CONNECT_TO_DEVICE':{},
    'DISCONNECT_FROM_DEVICE':{},
    'DISCONNECTING':{},
    'DISCONNECTED':{},
    'CONNECTING':{},
    'CONNECTED':{},
    'REQUEST_SYSTEM_COMMANDS': {},
    'AVAILABLE_SYSTEM_COMMANDS': {},
    'EXECUTE_COMMAND': {},
    'SOCKET_HISTORY': {},
    'POSITION_UPDATE': {},
    'GET_COMMAND_HISTORY': {},
    'COMMAND_HISTORY_DATA': {},
    'AUTH_LOGIN': {},
    'AUTH_SUCCESS': {},
    'AUTH_FAILURE': {},
    'AUTH_LOGOUT': {},
    'AUTH_CHECK': {}
});


export class ConnectionStatus extends Enum {}

ConnectionStatus.initEnum({
    'CONNECTING':{},
    'CONNECTED':{},
    'DISCONNECTING':{},
    'DISCONNECTED':{}
});

export class Colors extends Enum {}

Colors.initEnum({
    'lightBlue':    { get color() { return '#6FC0DE'; } },
    'darkBlue' :    { get color() { return '#3A7A91'; } },
    'darkerBlue' :  { get color() { return '#1D3D49'; } },
    'lightGray':    { get color() { return '#F0F0F0'; } },
    'goldenRod':    { get color() { return '#BA8B00'; } },
    'paradisePink': { get color() { return '#E83F6F'; } },
    'antGray':      { get color() { return '#ececec'; } }
});


export class CommandStatus extends Enum {}

CommandStatus.initEnum({
    'PENDING':      { },
    'ACTIVE':       { },
    'SKIPPED':      { },
    'COMPLETED':    { },
    'ERROR':        { }
});
