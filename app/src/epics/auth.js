import {ajax} from 'rxjs/ajax';
import {of} from 'rxjs';

import * as actions from "action_creators";

import {ActionType} from 'enums';

export const loginEpic = (action$, store, {socket, initialState}) => {
    return action$
      .ofType(ActionType.AUTH_LOGIN)
      .switchMap((action)=> {
          let ajax$ = ajax.post(`/api/login`,
            {user: action.username, pass: action.password, remember: false},
            {'X-Api-Key': initialState.config.api_key});

          return ajax$.map(actions.authSuccess).catch(error => {
              if(error.status === 401) {
                  return of(actions.authFailure(error))
              }
              return of(actions.ajaxError(error))
          });
      });
};

export const checkAuthEpic = (action$, store, {socket, initialState}) => {
    return action$
      .ofType(ActionType.AUTH_CHECK)
      .switchMap(() => {
        let ajax$ = ajax.post(`/api/login`,
          {passive: true},
          {'X-Api-Key': initialState.config.api_key}
          );

        return ajax$.filter(response => { return response !== undefined; }).map(actions.authSuccess).catch(error => { of(actions.ajaxError(error))});
      });
}

