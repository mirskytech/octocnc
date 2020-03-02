import {Enum} from 'enumify';
import React from 'react';

export class ActionType extends Enum {}

// use the object init format. seems that jetbrains can tab complete then
ActionType.initEnum({
    'AJAX_ERROR':{},
    'AUTH_CHECK': {},
    'AUTH_FAILURE': {},
    'AUTH_LOGIN': {},
    'AUTH_LOGOUT': {},
    'AUTH_SUCCESS': {},
    'AVAILABLE_SYSTEM_COMMANDS': {},
    'COMMAND_HISTORY_DATA': {},
    'CONNECTED':{},
    'CONNECTING':{},
    'CONNECT_TO_DEVICE':{},
    'DEVICE_CONNECTION_INFO':{},
    'DEVICE_STATE': {},
    'DISCONNECT_FROM_DEVICE':{},
    'DISCONNECTING':{},
    'DISCONNECTED':{},
    'GET_COMMAND_HISTORY': {},
    'GET_DEVICE_STATE': {},
    'HOME_MACHINE': {},
    'LINEAR_MOVE': {},
    'LOGOUT_SUCCESS': {},
    'NOT_IMPLEMENTED': {},
    'POSITION_UPDATE': {},
    'REQUEST_DEVICE_CONNECTIONS': {},
    'REQUEST_SYSTEM_COMMANDS': {},
    'SEND_COMMAND': {},
    'SET_ABSOLUTE_POSITIONING': {},
    'SET_ANSI': {},
    'SET_INCREMENTAL_POSITIONING': {},
    'SET_RELATIVE_POSITIONING': {},
    'SET_POSITIONING': {},
    'SET_METRIC': {},
    'SET_UNITS': {},
    'SOCKET_HISTORY': {}

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


export class Positioning extends Enum {}

Positioning.initEnum({
    'ABSOLUTE':     {},
    'RELATIVE':     {},
    'INCREMENTAL':  {}
});

export class Units extends Enum {}

Units.initEnum({
    'METRIC': {},
    'ANSI': {}
});
