// @flow

import {combineEpics} from 'redux-observable';

import {LOCATION_CHANGE} from 'react-router-redux';
import {ajax} from 'rxjs/observable/dom/ajax';
import {of} from 'rxjs/observable/of';
import {timer} from 'rxjs/observable/timer';
import * as actions from "./action_creators";
import {ActionName} from "./actions";

function mapToAction(actionCreator) {
    return (action) => {
        return actionCreator(action.payload)
    };
}

const el = document.getElementById('_server_config');
const server_config = JSON.parse(el ? el.innerHTML : '{}');

declare class ReduxObservable<T> extends rxjs$Observable<T> {
     ofType(actionType: string): rxjs$Observable<T>;
}

export default function createRootEpics(socket: WebSocket, config: Object) {

    const deviceConnectionsEpic  = (action$) => {
        return action$
            .ofType(ActionName.REQUEST_DEVICE_CONNECTIONS)
            .switchMap((action) => {
                let ajax$ = ajax.getJSON(`/api/connection`, {'X-Api-Key':server_config.api_key});
                return ajax$.retry(1).map(actions.deviceConnectionInfo).catch(actions.ajaxError);
            });
    };


    return combineEpics(
        deviceConnectionsEpic
    );
};
