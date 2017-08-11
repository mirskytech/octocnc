import { combineReducers } from 'redux';
import { routerReducer as routing} from 'react-router-redux';
import { CommandStatus, ActionType } from '../enums';

import devices from './devices';
import commands from './commands';
import position from './position';

function config(state=[], action) {
    return state;
}


export default combineReducers({
    routing,
    position,
    config,
    devices,
    commands
});
