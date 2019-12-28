import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter} from 'rxjs/operators';


import * as actions from "action_creators";

import {ActionType} from 'enums';

export const loginEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
      ofType(ActionType.AUTH_LOGIN),
      switchMap((action)=> {
          let ajax$ = ajax.post(`/api/login`,
            {user: action.username, pass: action.password, remember: false},
            {'X-Api-Key': initialState.config.api_key});

          return ajax$.pipe(
              map(actions.authSuccess),
              catchError(error => {
                if(error.status === 401) {
                  return of(actions.authFailure(error))
              }
              return of(actions.ajaxError(error))
            })
          );
      })
    );
};

export const checkAuthEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
      ofType(ActionType.AUTH_CHECK),
      switchMap(() => {
        let ajax$ = ajax.post(`/api/login`,
          {passive: true},
          {'X-Api-Key': initialState.config.api_key}
          );

        return ajax$.pipe(
            filter(response => { return response !== undefined; }),
            map(actions.authSuccess),
            catchError(error => { of(actions.ajaxError(error))})
        );
      })
    );
};
