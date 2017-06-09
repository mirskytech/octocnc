// @flow

import {combineEpics} from 'redux-observable';
import {
    loadChatsResponse,
    threadPage,
    threadPageResponse,
    sendMessage,
    messageAck,
    messageReceive,
    threadUpdate,
    threadChange,
    threadUpdateExternal,
    threadNew,
    threadLeave,
    threadRemove,
    userActive,
    userInactive,
    ajaxError, performanceDailyData, reportingError
} from './action_creators';
import type {Action, WebsocketAction} from './action_creators';
import {LOCATION_CHANGE} from 'react-router-redux';
import {ajax} from 'rxjs/observable/dom/ajax';
import {of} from 'rxjs/observable/of';
import {timer} from 'rxjs/observable/timer';
import {findThread, threadEqual} from './util/thread';

const MSG_TYPE_MESSAGE = 0;
const MSG_TYPE_MESSAGE_ACK = 3;
const MSG_TYPE_THREAD_UPDATE = 7;
const MSG_TYPE_ACTIVE = 8;
const MSG_TYPE_CLOSE = 9;

function mapToAction(actionCreator) {
    return (action) => {
        return actionCreator(action.payload)
    };
}

declare class ReduxObservable<T> extends rxjs$Observable<T> {
     ofType(actionType: string): rxjs$Observable<T>;
}

export default function createRootEpics(socket: WebSocket, config: Object) {
    let tempId = 1;

    function sendLeave(threadInfo) {
        if (threadInfo.timeline_id) {
            socket.send({
                command: 'leave_staff',
                timeline_id: '' + threadInfo.timeline_id
            });
        } else {
            socket.send({
                command: 'leave_staff',
                anonymous_thread_id: '' + threadInfo.anonymous_thread_id
            });
        }
    }

    const websocketMessageEpic = (action$: ReduxObservable<*>, store: Store<Action,boolean>) => {
        const websocket$ = action$.ofType('WEBSOCKET_MESSAGE').share();
        const onlyThreadWebsocket$ = websocket$
            .filter((action: WebsocketAction): boolean => threadEqual(action.payload.data, store.getState().selectedThread)).share();

        const ack$ = onlyThreadWebsocket$
            .filter((socketAction: WebsocketAction): boolean => socketAction.payload.type === MSG_TYPE_MESSAGE_ACK)
            .map((socketAction: WebsocketAction): Action => messageAck(socketAction.payload.data.temp_id, socketAction.payload.data.id));

        const threadChange$ = websocket$
            .filter((socketAction: WebsocketAction): boolean => socketAction.payload.type === MSG_TYPE_THREAD_UPDATE)
            .map((socketAction: WebsocketAction): Action => threadUpdateExternal(socketAction.payload.data));

        const message$ = onlyThreadWebsocket$
            .filter((socketAction: WebsocketAction) => socketAction.payload.type === MSG_TYPE_MESSAGE)
            .map((socketAction: WebsocketAction): Action => {
                const data = socketAction.payload.data;
                return messageReceive({
                    text: data.text,
                    timeline_id: data.timeline_id,
                    id: data.id,
                    date: data.date,
                    is_staff: data.is_staff,
                    user_name: config.user_id == data.user_id ? null : data.user_name
                })
            });

        const active$ = onlyThreadWebsocket$
            .filter((socketAction: WebsocketAction): boolean => socketAction.payload.type === MSG_TYPE_ACTIVE && config.user_id !== socketAction.payload.data.user_id)
            .map((socketAction: WebsocketAction): Action => {
                return userActive(socketAction.payload.data);
            });

        const threadExternalClose$ = websocket$
            .filter((socketAction: WebsocketAction): boolean => socketAction.payload.type === MSG_TYPE_CLOSE)
            .map((socketAction: WebsocketAction): Action => {
                if (threadEqual(socketAction.payload.data, store.getState().selectedThread)) {
                    return threadLeave(socketAction.payload.data);
                }
                return threadRemove(socketAction.payload.data)
            });
        return ack$.merge(message$, threadChange$, active$, threadExternalClose$);
    };

    const externalThreadUpdateEpic = (action$: ReduxObservable<*>, store) => {
        return action$.ofType('THREAD_UPDATE_EXTERNAL').mergeMap((action) => {
            const threadUpdated = findThread(action.payload, store.getState().threads);
            if (threadUpdated) {
                return of(threadUpdate(threadUpdated, action.payload.is_staff));
            }

            let ajax$;
            if (action.payload.timeline_id) {
                ajax$ = ajax.getJSON(`provider/chat/timeline/${action.payload.timeline_id}/`);
            } else {
                ajax$ = ajax.getJSON(`provider/chat/anonymous-thread/${action.payload.anonymous_thread_id}`);
            }
            return ajax$.retry(1).map((response) => {
                return threadNew(response.result);
            }).catch(ajaxError);
        });
    };

    const loadThreadsEpic = action$ =>
        action$
            .ofType('LOAD_CHAT')
            .switchMap((action) => ajax.getJSON('provider/chat/threads/'))
            .map(loadChatsResponse);

    const threadClickEpic = (action$, store) => {
        let lastThread;
        const threadClick$ = action$
            .ofType('THREAD_CLICK').do(() => {
                lastThread = store.getState().selectedThread;
            }).share();

        const threadChange$ = threadClick$.map(mapToAction(threadChange));
        const loadPage$ = threadClick$.map((action) => threadPage(action.payload, 1));
        const leaveThread$ = threadClick$.do(() => {
            if (lastThread) {
                sendLeave(lastThread);
            }
        }).ignoreElements();
        const joinThread$ = threadClick$.do((action) => {
            if (action.payload.timeline_id) {
                socket.send({
                    command: 'join_staff',
                    timeline_id: '' + action.payload.timeline_id
                });
            } else {
                socket.send({
                    command: 'join_staff',
                    anonymous_thread_id: '' + action.payload.anonymous_thread_id
                });
            }
        }).ignoreElements();

        return loadPage$.merge(threadChange$, leaveThread$, joinThread$);
    };

    const threadLeaveEpic = (action$) =>
        action$.ofType('THREAD_LEAVE').do((action) => sendLeave(action.payload)).ignoreElements();

    const threadCloseClickEpic = (action$) =>
        action$
            .ofType('THREAD_CLOSE').do((action) => {
            if (action.payload.timeline_id) {
                socket.send({
                    command: 'close_staff',
                    timeline_id: '' + action.payload.timeline_id
                });
            } else {
                socket.send({
                    command: 'close_staff',
                    anonymous_thread_id: '' + action.payload.anonymous_thread_id
                });
            }
        }).ignoreElements();


    const threadChangeEpic = (action$) =>
        action$.ofType('THREAD_CHANGE')
            .switchMap((action) => timer(0, 5000).do(() => {
                if (action.payload.timeline_id) {
                    socket.send({
                        command: 'active_staff',
                        timeline_id: '' + action.payload.timeline_id
                    });
                } else {
                    socket.send({
                        command: 'active_staff',
                        anonymous_thread_id: '' + action.payload.anonymous_thread_id
                    });
                }
            }).ignoreElements());

    const loadThreadPageEpic = action$ =>
        action$
            .ofType('THREAD_PAGE')
            .switchMap((action) => {
                let ajax$;
                if (action.payload.thread.timeline_id) {
                    ajax$ = ajax.getJSON(`provider/chat/timeline/events/${action.payload.thread.timeline_id}/${action.payload.page}/`)
                } else {
                    ajax$ = ajax.getJSON(`provider/chat/anonymous-thread/messages/${action.payload.thread.anonymous_thread_id}/${action.payload.page}/`)
                }

                return ajax$.retry(1).map(threadPageResponse).catch(ajaxError);
            });

    const inputSubmitEpic = (action$, store) =>
        action$
            .ofType('INPUT_SUBMIT')
            .map((action) => sendMessage(action.payload, store.getState().selectedThread, tempId++));

    const sendMessageEpic = (action$) =>
        action$
            .ofType('MESSAGE_SEND')
            .do((action) => {
                if (action.payload.thread.timeline_id) {
                    socket.send({
                        command: 'send_staff',
                        timeline_id: '' + action.payload.thread.timeline_id,
                        text: action.payload.text,
                        temp_id: action.payload.tempId
                    })
                } else {
                    socket.send({
                        command: 'send_staff',
                        anonymous_thread_id: '' + action.payload.thread.anonymous_thread_id,
                        text: action.payload.text,
                        temp_id: action.payload.tempId
                    })
                }
            }).ignoreElements();

    const activeEpic = (action$) => {
        const userActive = action$
            .ofType('USER_ACTIVE')
            .share();


        return userActive.distinctUntilChanged((p, q) => threadEqual(p.payload, q.payload)).switchMap((action) =>
            of(action).merge(userActive)
                .groupBy((action) => action.payload.user_id)
                .mergeMap((groupObs) => groupObs.debounceTime(7000))
                .map((action) => userInactive(action.payload))
        )
    };

    const updatePerformanceDailyEpic  = (action$) => {
        return action$
            .ofType('UPDATE_PERFORMANCE_DAILY')
            .switchMap((action) => {
                let ajax$ = ajax.getJSON(`/provider/reports/performancedaily/?start=${action.start}&end=${action.end}`);
                return ajax$.retry(1).map(performanceDailyData).catch(reportingError);
            });
    };


    return combineEpics(
        websocketMessageEpic,
        threadClickEpic,
        loadThreadsEpic,
        loadThreadPageEpic,
        inputSubmitEpic,
        sendMessageEpic,
        externalThreadUpdateEpic,
        activeEpic,
        threadChangeEpic,
        threadCloseClickEpic,
        threadLeaveEpic,
        updatePerformanceDailyEpic
    );
};
