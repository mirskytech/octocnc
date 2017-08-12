import {ActionType} from "enums";
import {ajax} from 'rxjs/observable/dom/ajax';
import {of} from 'rxjs/observable/of';

import * as actions from "action_creators";

export const requestSystemCommandsEpic = (action$, store, {socket, initialState}) => {
    return action$
        .ofType(ActionType.REQUEST_SYSTEM_COMMANDS)
        .switchMap((action) => {
            let ajax$ = ajax.getJSON(`/api/system/commands/core`, {'X-Api-Key':initialState.config.api_key});
            return ajax$.retry(1).map(actions.availableSystemCommands).catch(actions.ajaxError);
        });
};

export const executeCommandEpic = (action$, store, {socket, initialState}) => {
    return action$
        .ofType(ActionType.EXECUTE_COMMAND)
        .switchMap((action) => {
            let ajax$ = ajax.post(`/api/printer/command`,
                JSON.stringify({'command': action.payload}),
                {'X-Api-Key': initialState.config.api_key, 'Content-Type': 'application/json'});
            return ajax$.ignoreElements();
        });
};
