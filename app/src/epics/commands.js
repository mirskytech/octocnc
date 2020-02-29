import {ActionType, Positioning} from "enums";
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter} from 'rxjs/operators';


import * as actions from "action_creators";
import {APIPost} from "../octoprint";

export const requestSystemCommandsEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.REQUEST_SYSTEM_COMMANDS),
        switchMap((action) => {
            let ajax$ = ajax.getJSON(`/api/system/commands/core`, {'X-Api-Key':store.value.api_key});
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
        ofType(ActionType.SEND_COMMAND),
        switchMap((action) => {
            let ajax$ = ajax.post(`/plugin/octocnc/command/send`,
                JSON.stringify({'command': action.payload}),
                {'X-Api-Key': store.value.api_key, 'Content-Type': 'application/json'});
            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const makeLinearMoveEpic = (action$, store, {socket, iniatialState}) => {
    return action$.pipe(
        ofType(ActionType.LINEAR_MOVE),
        switchMap((action) => {
            let ajax$ = ajax.post(`/plugin/octocnc/command/move/linear`,
                JSON.stringify({
                    'x': action.payload.x,
                    'y': action.payload.y,
                    'z': action.payload.z,
                    'f': action.payload.f
                }),
                {'X-Api-Key': store.value.api_key, 'Content-Type': 'application/json'});

            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const setPositioningEpic = (action$, store, {socket, iniatialState}) => {
    return action$.pipe(
        ofType(ActionType.SET_POSITIONING),
        switchMap((action) => {
            if(action.payload === Positioning.ABSOLUTE) {
                return of(actions.setAbsolute());
            } else if(action.payload === Positioning.RELATIVE) {
                return of(actions.setRelative());
            } else if(action.paylod === Positioning.INCREMENTAL) {
                return of(actions.notImplemented(action.type));
            }

            return of(actions.notImplemented(action.type));

        })
    );
};

export const setAbsoluteEpic = (action$, store, {socket, initialState}) => {
  return action$.pipe(
      ofType(ActionType.SET_ABSOLUTE_POSITIONING),
      switchMap((action) => {
          let ajax$ = APIPost(
              `/plugin/octocnc/command/set/abs`,
              {});

          return ajax$.pipe(
              ignoreElements(),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
  )
};

export const setRelativeEpic= (action$, store, {socket, initialState}) => {
  return action$.pipe(
      ofType(ActionType.SET_RELATIVE_POSITIONING),
      switchMap((action) => {
          let ajax$ = APIPost(
              `/plugin/octocnc/command/set/rel`,
              {});

          return ajax$.pipe(
              ignoreElements(),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
  )
};

export const logoutEpic = (action$, store, {socket, initialState}) => {
  return action$.pipe(
      ofType(ActionType.AUTH_LOGOUT),
      switchMap((action) => {
          let ajax$ = APIPost(
              `/api/logout`,
              {});

          return ajax$.pipe(
              ignoreElements(),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
  )
};



export const getCommandHistoryEpic = (action$, store, {socket, initialState}) => {
  return action$.pipe(
      filter(action => {
          return action.type === ActionType.DEVICE_CONNECTION_INFO && action.payload.current !== undefined && action.payload.current.state !== "Closed"
      }),
      switchMap((action) => {
          let ajax$ = ajax.getJSON(`/plugin/octocnc/command/history?device=${action.payload.current.printerProfile}`,
              {'X-Api-Key': store.value.api_key}
          );
          return ajax$.pipe(
              retry(1),
              map(actions.commandHistoryData),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
    );
};
