import { ajax } from "rxjs/ajax";

ajaxHeaders = (key) => {
    const headers = { 'Content-Type': 'application/json' };

    if(key !== null) {
        headers['X-Api-Key'] = key;
    }

    return headers;
};


export const APIPost = (url, body, key) => {

    return ajax({
        method: 'POST',
        url: url,
        body: JSON.stringify(body),
        headers: ajaxHeaders(key)
    });
};

export const APIGet = (url, key) => {

    return ajax({
        method: 'GET',
        url: url,
        headers: ajaxHeaders(key)
    });
};
