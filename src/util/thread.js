export function findThread(thread1, threads) {

    for (let i = 0; i < threads.length; i++) {
        const thread = threads[i];

        const isThread = threadEqual(thread1, thread);

        if (isThread) {
            return thread;
        }
    }

    return null;
}

export function threadEqual(thread1, thread2) {
    return thread1 && thread2 && ((thread1.timeline_id
            && thread1.timeline_id === thread2.timeline_id) ||
                    (thread1.anonymous_thread_id
                    && thread1.anonymous_thread_id === thread2.anonymous_thread_id));
}
