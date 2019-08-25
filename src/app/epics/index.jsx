// @flow

import {combineEpics} from 'redux-observable';

import { connectToDeviceEpic, determineConnectedDeviceEpic, deviceConnectionsEpic, disconnectFromDeviceEpic } from './devices';
import {requestSystemCommandsEpic, executeCommandEpic, getCommandHistoryEpic} from './commands';
import {checkAuthEpic, loginEpic} from "./auth";

export const rootEpic = combineEpics(
    deviceConnectionsEpic,
    connectToDeviceEpic,
    disconnectFromDeviceEpic,
    determineConnectedDeviceEpic,
    // requestSystemCommandsEpic,
    executeCommandEpic,
    getCommandHistoryEpic,
    loginEpic,
  checkAuthEpic
);
