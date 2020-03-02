// @flow

import {combineEpics} from 'redux-observable';

import * as devices from './devices';
import * as commands from './commands';
import * as auth from "./auth";
import * as settings from "./settings";

export const rootEpic = combineEpics(

    devices.deviceConnectionsEpic,
    devices.deviceStateEpic,
    devices.connectToDeviceEpic,
    devices.disconnectFromDeviceEpic,
    devices.determineConnectedDeviceEpic,

    commands.requestSystemCommandsEpic,
    commands.executeCommandEpic,
    commands.getCommandHistoryEpic,
    commands.makeLinearMoveEpic,

    commands.setAbsoluteEpic,
    commands.setRelativeEpic,
    commands.setPositioningEpic,

    commands.homeMachineEpic,

    commands.setUnitsEpic,
    commands.setMetricEpic,
    commands.setANSIEpic,

    auth.loginEpic,
    auth.checkAuthEpic,
    auth.logoutEpic,

    settings.disablePluginEpic
);
