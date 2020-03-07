import { combineReducers } from 'redux';

import { ActionType } from '../enums';

import deviceReducer from './devices';
import commandReducer from './commands';
import positionReducer from './position';
import authReducer from './auth';

function configReducer(state=[], action) {
    return state;
}

function errorReducer(state=[], action) {
    switch(action.type) {
        case ActionType.AJAX_ERROR:
            console.log("error received: ");
            console.log(action.payload);
            return {...state};
        case ActionType.NOT_IMPLEMENTED:
            console.log("not impplemented");
            console.log(action.payload);
            return {...state};
        case ActionType.UPLOAD_PROGRESS:
            console.log("upload progress");
            console.log(action.payload);
            return {...state};
        default:
            return {...state};
    }
}

export default combineReducers({
    errors: errorReducer,
    position: positionReducer,
    config: configReducer,
    devices: deviceReducer,
    commands: commandReducer,
    auth: authReducer
});
