import {ActionType} from "enums";
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter} from 'rxjs/operators';


import * as actions from "action_creators";

export const requestSystemCommandsEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.REQUEST_SYSTEM_COMMANDS),
        switchMap((action) => {
            let ajax$ = ajax.getJSON(`/api/system/commands/core`, {'X-Api-Key':initialState.config.api_key});
            return ajax$.pipe(
                retry(1),
                map(actions.availableSystemCommands),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const executeCommandEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.EXECUTE_COMMAND),
        switchMap((action) => {
            let ajax$ = ajax.post(`/plugin/octocnc/command/send`,
                JSON.stringify({'command': action.payload}),
                {'X-Api-Key': initialState.config.api_key, 'Content-Type': 'application/json'});
            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const getCommandHistoryEpic = (action$, store, {socket, initialState}) => {
  return action$.pipe(
      filter(action => {
          return action.type === ActionType.DEVICE_CONNECTION_INFO && action.payload.current !== undefined && action.payload.current.state !== "Closed"
      }),
      switchMap((action) => {
          let ajax$ = ajax.getJSON(`/plugin/octocnc/command/history?device=${action.payload.current.printerProfile}`,
              {'X-Api-Key': initialState.config.api_key}
          );
          return ajax$.pipe(
              retry(1),
              map(actions.commandHistoryData),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
    );
};
