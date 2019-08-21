import {ajax} from 'rxjs/observable/dom/ajax';
import {of} from 'rxjs/observable/of';

import * as actions from "action_creators";

export const loginEpic = (action$, store, {socket, initialState}) => {
    return action$
      .ofType(ActionType.LOGIN_SUBMIT)
      .switchMap((action)=> {
          let ajax$ = ajax.post(`/api/login`,
            {username: action.username, password: action.password},
            {'X-Api-Key': initialState.config.api_key});

          return ajax$.map(actions.authSuccess).catch(error => {
              if(error.status === 401) {
                  return of(actions.authFailure(error.type))
              }
              return of(actions.ajaxError(error))
          });
      });




};

