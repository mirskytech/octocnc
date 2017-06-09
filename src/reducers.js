// @flow

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import type {Action} from './action_creators';
import { ActionName } from './actions';

function devices(state = [], action) {

    switch(action.type) {
        case ActionName.REQUEST_DEVICE_CONNECTIONS:
            console.log("Requesting information about devices");
            return { ...state };
        case ActionName.DEVICE_CONNECTION_INFO:
            console.log("Device connection info received!");
            console.log(action.payload);
            return { ...state };
        default:
            return { ...state };
    }
}

export default combineReducers({
    routing,
    devices
});
