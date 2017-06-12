// @flow

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import type {Action} from './action_creators';
import { ActionName } from './actions';

function config(state=[], action) {
    return state;
}

function _mapPrinterProfiles(profiles) {
    return profiles
}

function _mapBaudRates(rates) {

}

function devices(state = [], action) {

    switch(action.type) {
        case ActionName.REQUEST_DEVICE_CONNECTIONS:
            return { ...state };
        case ActionName.DEVICE_CONNECTION_INFO:
            const opt = action.payload.options;
            return {
                devices: opt.printerProfiles.map( (el, idx) => { return {'text':el.name, 'value':el.id, 'key':idx }; }),
                baudrates: opt.baudrates.map( (el, idx) => { return {'text':el, 'value':el, 'key':idx }; }),
                ports: opt.ports.map((el, idx) => { return {'text':el, 'value':el, 'key':idx }; }),
                ...state };
        default:
            return { ...state };
    }
}

export default combineReducers({
    routing,
    config,
    devices
});
