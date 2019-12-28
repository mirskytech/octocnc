import {ActionType} from "enums";
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';

import * as actions from "action_creators";

export const requestSystemCommandsEpic = (action$, store, {socket, initialState}) => {
    return action$
        .ofType(ActionType.REQUEST_SYSTEM_COMMANDS)
        .switchMap((action) => {
            let ajax$ = ajax.getJSON(`/api/system/commands/core`, {'X-Api-Key':initialState.config.api_key});
            return ajax$.retry(1).map(actions.availableSystemCommands).catch(error => of(actions.ajaxError(error)));
        });
};

export const executeCommandEpic = (action$, store, {socket, initialState}) => {
    return action$
        .ofType(ActionType.EXECUTE_COMMAND)
        .switchMap((action) => {
            let ajax$ = ajax.post(`/plugin/octocnc/command/send`,
                JSON.stringify({'command': action.payload}),
                {'X-Api-Key': initialState.config.api_key, 'Content-Type': 'application/json'});
            return ajax$.ignoreElements().catch(error => of(actions.ajaxError(error)));
        });
};

export const getCommandHistoryEpic = (action$, store, {socket, initialState}) => {
  return action$
      .filter(action => {
          return action.type === ActionType.DEVICE_CONNECTION_INFO && action.payload.current !== undefined && action.payload.current.state !== "Closed"
      })
      .switchMap((action) => {
          let ajax$ = ajax.getJSON(`/plugin/octocnc/command/history?device=${action.payload.current.printerProfile}`,
              {'X-Api-Key': initialState.config.api_key}
          );
          return ajax$.retry(1).map(actions.commandHistoryData).catch(error => of(actions.ajaxError(error)));
    });
};
