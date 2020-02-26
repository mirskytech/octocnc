// @flow

import {combineEpics} from 'redux-observable';

import { connectToDeviceEpic, determineConnectedDeviceEpic, deviceConnectionsEpic, disconnectFromDeviceEpic } from './devices';
import {requestSystemCommandsEpic, executeCommandEpic, getCommandHistoryEpic, makeLinearMoveEpic} from './commands';
import {checkAuthEpic, loginEpic, logoutEpic} from "./auth";

export const rootEpic = combineEpics(
    deviceConnectionsEpic,
    connectToDeviceEpic,
    disconnectFromDeviceEpic,
    determineConnectedDeviceEpic,
    requestSystemCommandsEpic,

    executeCommandEpic,
    getCommandHistoryEpic,
    makeLinearMoveEpic,


    loginEpic,
    checkAuthEpic,
    logoutEpic
);
