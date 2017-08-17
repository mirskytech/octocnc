import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { ActionType } from '../enums';

import devices from './devices';
import commands from './commands';
import position from './position';

function config(state=[], action) {
    return state;
}

function errors(state=[], action) {
    switch(action.type) {
        case ActionType.AJAX_ERROR:
            console.log("error received: ");
            console.log(action.payload);
            return {...state};
        default:
            return {...state};
    }
}

export default combineReducers({
    routerReducer,
    errors,
    position,
    config,
    devices,
    commands
});
