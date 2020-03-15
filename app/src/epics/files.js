import * as actions from "../action_creators";
import {ofType} from "redux-observable";
import {of, Subject} from "rxjs/index";
import {catchError, switchMap, map, ignoreElements, merge} from "rxjs/operators/index";
import {ActionType} from "../enums";
import {APIGet, APIPost} from "../octoprint";
import {ajax} from "rxjs/ajax/index";
import {delay, mergeMap, concatAll} from "rxjs/operators";

export const getFileListEpic = (action$, store, {socket, iniatialState}) => {
  return action$.pipe(
      ofType(ActionType.GET_FILE_LIST),
      switchMap((action) => {
         let ajax$ =  APIGet(`/api/files?recursive=true`, store.value.api_key);

         return ajax$.pipe(
             map(actions.fileList),
             catchError(error => of(actions.ajaxError(error)))
         );
      })
  );
};

export const uploadFileEpic = (action$, store, {socket, initialState}) => {

    return action$.pipe(
        ofType(ActionType.UPLOAD_FILE),
        switchMap((action) => {

            // https://www.linkedin.com/pulse/file-upload-rxjs-vladim%C3%ADr-gorej/
            // https://html.developreference.com/article/10767105/redux-observable+use+RxJS+to+emit+progress+actions+for+ajax+call

            // https://codesandbox.io/s/2zzjljmnzn

            // https://stackoverflow.com/questions/41880983/implementing-fromsubscriber-in-rxjs
            // https://stackoverflow.com/a/41884813

            const formData = new FormData();
            formData.append('file', action.payload.file, action.payload.name);

            const progressSubscriber = new Subject();

            let ajax$ = ajax({
                method: 'POST',
                url: `/api/files/local`,
                body: formData,
                headers: {
                    'X-Api-Key': store.value.api_key
                },
                progressSubscriber: progressSubscriber});

            const requestO = ajax$.pipe(
                map(actions.getFileList),
                delay(3000),
                map(actions.uploadComplete),
                catchError(error => of(actions.ajaxError(error)))
            );

            return progressSubscriber.pipe(
                map((e) => ({percentage: (e.loaded / e.total) * 100})),
                map((percentage) => (actions.uploadProgress(percentage))),
                merge(requestO)
            );
        })
    );
};

export const createFolderEpic = (action$, store, {socket, initialState}) => {

    return action$.pipe(
        ofType(ActionType.CREATE_FOLDER),
        switchMap((action) => {
            const formData = new FormData();
            formData.append('foldername', action.payload.name);
            if(action.payload.location !== null) {
                formData.append('path', '/');
            }

            let ajax$ = ajax({
                method: 'POST',
                url: `/api/file/local'`,
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-Api-Key': store.value.api_key
                }});

            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            );
        })
    );
};

