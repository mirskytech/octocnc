import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';
import { ofType } from 'redux-observable';
import {switchMap, retry, map, catchError, ignoreElements, filter} from 'rxjs/operators';

import { APIPost } from '../octoprint';
import * as actions from "../action_creators";

import {ActionType} from 'enums';

export const loginEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
      ofType(ActionType.AUTH_LOGIN),
      switchMap((action)=> {
          let ajax$ = APIPost(
              `/api/login`,
              {
                  user: action.username,
                  pass: action.password,
                  remember: false
              });

          return ajax$.pipe(
              map(actions.authSuccess),
              catchError((error) => {
                if(error.status === 401) {
                  return of(actions.authFailure(error));
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
      switchMap((action) => {
        let ajax$ = APIPost(
            '/api/login',
            {
                passive: true
            });

        return ajax$.pipe(
            filter(response => response.response.active),
            map(actions.authSuccess),
            catchError(error => { of(actions.ajaxError(error))})
        );
      })
    );
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
              catchError(error => { of(actions.ajaxError(error))})
          );
      })
  )
};
