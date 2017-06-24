import {Enum} from 'enumify';
import React from 'react';
import FontAwesome from 'react-fontawesome';

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
