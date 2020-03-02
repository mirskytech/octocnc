import {catchError, filter, map, switchMap} from "rxjs/operators/index";
import * as actions from "../action_creators";
import {ofType} from "redux-observable";
import {of} from "rxjs/index";
import {ActionType} from "../enums";
import {APIPost} from "../octoprint";
import {ignoreElements} from "rxjs/operators";


export const disablePluginEpic = (action$, store, {socket, initialState}) => {
    return action$.pipe(
      ofType(ActionType.DISABLE_PLUGIN),
      switchMap((action) => {
        let ajax$ = APIPost(
            '/api/plugin/pluginmanager',
            {
                'command': 'disable',
                'plugin':'octocnc'
            });

        return ajax$.pipe(
            ignoreElements(),
            catchError(error => { of(actions.ajaxError(error))})
        );
      })
    );
};

//Request URL: http://octoalpha.local/api/system/commands/core/restart
