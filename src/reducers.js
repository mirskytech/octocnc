// @flow

import {combineReducers} from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import type {Action, Message, Thread, SentMessage, UserActive} from './action_creators';
import {findThread} from './util/thread';
function threads(state = [], action: Action): Array<Thread> {
    switch (action.type) {
        case 'LOAD_CHAT_RESPONSE':
            if(!!action.payload) {
                return action.payload.results;
            }
            return '';
        case 'THREAD_UPDATE':
            const payload = action.payload;
            return state.map((thread) => {
                if (thread === payload.thread) {
                    return Object.assign({}, thread, {new_message: !payload.is_staff});
                }

                return thread;
            });
        case 'THREAD_NEW':
            return state.concat([action.payload]);
        case 'THREAD_CLOSE':
        case 'THREAD_REMOVE':
        case 'THREAD_LEAVE':
            const removeThread = findThread(action.payload, state);
            if (removeThread) {
                return state.filter((thread) => thread !== removeThread);
            }
            return state;
        default:
            return state;
    }
}

function selectedThread(state = null, action: Action): ?Thread {
    switch (action.type) {
        case 'THREAD_CHANGE':
            return action.payload;
        case 'THREAD_LEAVE':
        case 'THREAD_CLOSE':
            return null;
        default:
            return state;
    }
}

function messages(state = [], action: Action): Array<Message> {
    switch (action.type) {
        case 'THREAD_PAGE_RESPONSE':
            return action.payload.results;
        case 'MESSAGE_RECEIVE':
            return [...state, action.payload];
        case 'THREAD_LEAVE':
        case 'THREAD_CLOSE':
            return [];
        default:
            return state;
    }
}

function inputMessage(state = '', action: Action): string {
    switch (action.type) {
        case 'INPUT_MESSAGE_CHANGE':
            return action.payload;
        case 'MESSAGE_ACK':
            return '';
        case 'THREAD_LEAVE':
        case 'THREAD_CLOSE':
            return '';
        default:
            return state;
    }
}

function sending(state: boolean = false, action: Action): boolean {
    switch (action.type) {
        case 'MESSAGE_SEND':
            return true;
        case 'MESSAGE_ACK':
            return false;
        default:
            return state;
    }
}

function sentMessages(state: Array<SentMessage> = [], action: Action): Array<SentMessage> {
    switch (action.type) {
        case 'MESSAGE_SEND':
            return [...state, action.payload];
        case 'MESSAGE_ACK':
            const tempId = action.payload.tempId;
            const id = action.payload.id;
            return state.map((message) => {
                if (message.tempId === tempId) {
                    message.id = id;
                }

                return message;
            });
        case 'MESSAGE_RECEIVE':
            const messageId = action.payload.id;
            return state.filter((message) => {
                return message.id !== messageId;
            });
        case 'THREAD_LEAVE':
        case 'THREAD_CLOSE':
            return [];
        default:
            return state;
    }
}

function usersActive(state: Array<UserActive> = [], action: Action): Array<UserActive> {
    switch (action.type) {
        case 'USER_ACTIVE':
            const payloadAction = action.payload;
            const activeInfo = state.find((activeInfo) => payloadAction.user_id === activeInfo.user_id);
            if (activeInfo) {
                return state;
            }
            return state.concat([action.payload]);
        case 'USER_INACTIVE':
            const actionPayload = action.payload;
            const activeInfo2 = state.find((activeInfo) => actionPayload.user_id === activeInfo.user_id);
            if (activeInfo2) {
                return state.filter((activeInfo) => activeInfo.user_id !== actionPayload.user_id);
            }
            return state;
        case 'THREAD_CHANGE':
        case 'THREAD_LEAVE':
        case 'THREAD_CLOSE':
            return [];
        default:
            return state;
    }
}

function report(state = [], action) {

    switch(action.type) {
        case 'PERFORMANCE_DAILY_DATA':
            let sorted = action.payload.results.sort((a,b) => a['interval']-b['interval']);

            let pay_rate_all = [];
            sorted.reduce( (acc,val,idx) => pay_rate_all[idx] = acc+val['pay_rate_all'], 0);

            let pay_rate_cedar = [];
            sorted.reduce( (acc, val, idx) => pay_rate_cedar[idx] = acc+val['pay_rate_cedar'], 0);

            return { ...state,
                'pay_rate_data': {
                    'interval': sorted.map((val, idx, arr) => val['interval']),
                    'all': pay_rate_all,
                    'cedar': pay_rate_cedar
                }};
        case 'UPDATE_PERFORMANCE_DAILY':
            return { ...state,
                'pay_rate_data':{
                    'interval':[],
                    'all':[],
                    'cedar':[]
                }};
        case 'REPORTING_ERROR':
            // TODO : better reporting of error messages
            // TODO : clear of reporting error under ? conditions
            return {
                ...state,
                'error':'data load might not complete due to error'
            };
        default:
            return { ...state };
    }
}

export default combineReducers({
    routing,
    usersActive,
    sending,
    threads,
    messages,
    inputMessage,
    sentMessages,
    selectedThread,
    report
});
