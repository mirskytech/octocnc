import {ActionType, Positioning, Units} from "enums";
import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter} from 'rxjs/operators';
import {APIPost, APIGet} from "../octoprint";

import * as actions from "action_creators";

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
            let ajax$ = APIPost(
                `/plugin/octocnc/command/send`,
                {
                    'command': action.payload
                },
                store.value.api_key
            );

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
            let ajax$ = APIPost(
                `/plugin/octocnc/command/move/linear`,
                {
                    'x': action.payload.x,
                    'y': action.payload.y,
                    'z': action.payload.z,
                    'f': action.payload.f
                },
                store.value.api_key
            );

            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const homeMachineEpic = (action$, store, {socket, iniatialState}) => {
  return action$.pipe(
      ofType(ActionType.HOME_MACHINE),
      switchMap((action) => {
         let ajax$ =  APIPost(`/plugin/octocnc/command/home`, {}, store.value.api_key);

         return ajax$.pipe(
             ignoreElements(),
             catchError(error => of(actions.ajaxError(error)))
         );
      })
  );
};

export const setUnitsEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
        ofType(ActionType.SET_UNITS),
        switchMap((action) => {
            if(action.payload === Units.METRIC) {
                return of(actions.setMetric());
            } else if(action.payload === Units.ANSI) {
                return of(actions.setANSI());
            }

            return of(actions.notImplemented(action.type));
        })
    );
};

export const setMetricEpic = (action$, store, {socket, initialtate}) => {
    return action$.pipe(
        ofType(ActionType.SET_METRIC),
        switchMap((action) => {
            let ajax$ = APIPost(`/plugin/octocnc/command/set/metric`, {}, store.value.api_key);

            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

export const setANSIEpic = (action$, store, {socket, initialtate}) => {
    return action$.pipe(
        ofType(ActionType.SET_ANSI),
        switchMap((action) => {
            let ajax$ = APIPost(`/plugin/octocnc/command/set/ansi`, {}, store.value.api_key);

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
          let ajax$ = APIPost(`/plugin/octocnc/command/set/abs`, {}, store.value.api_key);

          return ajax$.pipe(
              ignoreElements(),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
  );
};

export const setRelativeEpic= (action$, store, {socket, initialState}) => {
  return action$.pipe(
      ofType(ActionType.SET_RELATIVE_POSITIONING),
      switchMap((action) => {
          let ajax$ = APIPost(`/plugin/octocnc/command/set/rel`, {}, store.value.api_key);

          return ajax$.pipe(
              ignoreElements(),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
  );
};

export const logoutEpic = (action$, store, {socket, initialState}) => {
  return action$.pipe(
      ofType(ActionType.AUTH_LOGOUT),
      switchMap((action) => {
          let ajax$ = APIPost(`/api/logout`, {}, store.value.api_key);

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
          const url = `/plugin/octocnc/command/history?device=${action.payload.current.printerProfile}`;
          let ajax$ = APIGet(url, store.value.api_key);

          return ajax$.pipe(
              retry(1),
              map(actions.commandHistoryData),
              catchError(error => of(actions.ajaxError(error)))
          );
      })
    );
};
