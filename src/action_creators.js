// @flow
export type Thread = {
    patient_name: string,
    timeline_id?: number,
    anonymous_thread_id?: number,
    date: number,
    new_message: boolean
};

export type ThreadExternalChange = {
    is_staff: boolean,
    timeline_id?: number,
    anonymous_thread_id?: number,
    date: number
};

export type SentMessage = {
    text: string,
    thread: Thread,
    tempId: number,
    id?: number
};

export type ThreadListResponse = {
    results: Array<Thread>
};

export type ThreadPageResponse = {
    results: Array<Message>
};

export type Message = {
    text: string,
    timeline_id?: number,
    anonymous_thread_id?: number,
    id: number,
    date: number
};

export type UserActive = {
    is_staff: boolean,
    user_id: number,
    user_name: string,
    anonymous_thread_id?: number,
    timeline_id?: number
};

export type ThreadInfo = {
    anonymous_thread_id?: number,
    timeline_id?: number
};

export type WebsocketAction = {
    type: 'WEBSOCKET_MESSAGE',
    payload: {
        type: number,
        data: any
    }
}

export type Action = WebsocketAction | {
    type: 'THREAD_PAGE_RESPONSE',
    payload: ThreadPageResponse
} | {
    type: 'THREAD_CLICK',
    payload: Thread
} | {
    type: 'THREAD_CHANGE',
    payload: Thread
} | {
    type: 'THREAD_NEW',
    payload: Thread
} | {
    type: 'THREAD_PAGE',
    payload: {
        thread: Thread,
        page: number
    }
} | {
    type: 'THREAD_UPDATE',
    payload: {
        thread: Thread,
        is_staff: boolean
    }
} | {
    type: 'THREAD_UPDATE_EXTERNAL',
    payload: ThreadExternalChange
} | {
    type: 'THREAD_LEAVE',
    payload: ThreadInfo
} | {
    type: 'THREAD_REMOVE',
    payload: ThreadInfo
} | {
    type: 'THREAD_CLOSE',
    payload: Thread
} | {
    type: 'INPUT_MESSAGE_CHANGE',
    payload: string
} | {
    type: 'MESSAGE_SEND',
    payload: SentMessage
} | {
    type: 'MESSAGE_ACK',
    payload: {
        tempId: number,
        id: number
    }
} | {
    type: 'MESSAGE_RECEIVE',
    payload: Message
} |  {
    type: 'LOAD_CHAT'
} | {
    type: 'LOAD_CHAT_RESPONSE',
    payload: ThreadListResponse
} | {
    type: 'INFINITE_THREAD_SCROLL'
} | {
    type: 'INPUT_SUBMIT'
} | {
    type: 'USER_ACTIVE',
    payload: UserActive
}  | {
    type: 'USER_INACTIVE',
    payload: UserActive
} | {
    type: 'AJAX_ERROR',
    payload: Error
} | {
    type: 'CHANGE_FILTER',
    payload: string
} | {
    type: 'UPDATE_FINANCIAL_REPROT',
    payload: any
};

export const loadChats = (): Action => ({type: 'LOAD_CHAT'});

export const loadChatsResponse = (payload: ThreadListResponse): Action =>
    ({type: 'LOAD_CHAT_RESPONSE', payload});

export const threadClick = (thread: Thread): Action =>
    ({type: 'THREAD_CLICK', payload: thread});

export const threadClose = (thread: Thread): Action =>
    ({type: 'THREAD_CLOSE', payload: thread});

export const threadChange = (thread: Thread): Action =>
    ({type: 'THREAD_CHANGE', payload: thread});

export const threadRemove = (removeInfo: ThreadInfo): Action => ({
    type: 'THREAD_REMOVE',
    payload: removeInfo
});

export const threadLeave = (leaveInfo: ThreadInfo): Action => ({
    type: 'THREAD_LEAVE',
    payload: leaveInfo
});

export const threadPage = (thread: Thread, page: number): Action => ({
    type: 'THREAD_PAGE',
    payload: {
        thread,
        page
    }
});
export const threadPageResponse = (payload: ThreadPageResponse): Action =>
    ({type: 'THREAD_PAGE_RESPONSE', payload});

export const threadUpdate = (thread: Thread, is_staff: boolean): Action => ({
    type: 'THREAD_UPDATE',
    payload: {
        thread,
        is_staff
    }
});

export const threadUpdateExternal = (info: ThreadExternalChange): Action => ({
    type: 'THREAD_UPDATE_EXTERNAL',
    payload: info
});

export const threadNew = (info: Thread): Action => ({
    type: 'THREAD_NEW',
    payload: info
});

export const infinteThreadScroll = (): Action =>
    ({type: 'INFINITE_THREAD_SCROLL'});

export const inputMessageChange = (message: string): Action =>
    ({type: 'INPUT_MESSAGE_CHANGE', payload: message});

export const inputSubmit = (message: string): Action => ({
    type: 'INPUT_SUBMIT',
    payload: message
});

export const messageReceive = (message: Message): Action => ({
    type: 'MESSAGE_RECEIVE',
    payload: message
});


export const sendMessage = (text: string, thread: Thread, tempId: number): Action => ({
    type: 'MESSAGE_SEND',
    payload: {
        text,
        thread,
        tempId
    }
});

export const messageAck = (tempId: number, id: number): Action => ({
    type: 'MESSAGE_ACK',
    payload: {
        tempId,
        id
    }
});

export const userActive = (info: UserActive): Action => ({
    type: 'USER_ACTIVE',
    payload: info
});

export const userInactive = (info: UserActive): Action => ({
    type: 'USER_INACTIVE',
    payload: info
});

export const websocketMessage = (info: any): Action => ({
    type: 'WEBSOCKET_MESSAGE',
    payload: info
});

export const ajaxError = (info: Error): Action => ({
    type: 'AJAX_ERROR',
    payload: info
});

export const reportingError = (info: Error): Action => ({
    type: 'REPORTING_ERROR',
    payload: info
});

export const updatePerformanceDaily = (start: any, end: any): Action => ({
    type: 'UPDATE_PERFORMANCE_DAILY',
    start: start,
    end: end
});

export const performanceDailyData = (results: any): Action => ({
    type:'PERFORMANCE_DAILY_DATA',
    payload: results
});

