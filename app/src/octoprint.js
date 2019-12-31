import { ajax } from "rxjs/ajax";


export const APIPost = (url, body) => {
    return ajax({
        method: 'POST',
        url: url,
        body: body,
        headers: {
            'Content-Type': 'application/json'
        }});
};

export const APIGet = (url) => {
    return ajax.getJSON(url);
};
