import * as actions from "../action_creators";
import {ofType} from "redux-observable";
import {of, Subject} from "rxjs/index";
import {catchError, switchMap, map, ignoreElements, merge} from "rxjs/operators/index";
import {ActionType} from "../enums";
import {APIGet, APIPost} from "../octoprint";
import {ajax} from "rxjs/ajax/index";
import {randomBytes} from "crypto";

export const getFileListEpic = (action$, store, {socket, iniatialState}) => {
  return action$.pipe(
      ofType(ActionType.GET_FILE_LIST),
      switchMap((action) => {
         let ajax$ =  APIGet(`/api/files?recursive=true`, {});

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

            const data = randomBytes(1000000000);

            const formData = new FormData();
            const blob = new Blob([data], { type: 'application/octet-stream' });

            formData.append('file', blob, 'filename.gcode');

            let ajax$ = ajax({
                method: 'POST',
                url: `/api/files/local`,
                body: formData});

            const progressSubscriber = new Subject();

            progressSubscriber.pipe(merge(ajax$)).subscribe(console.dir);

            return ajax$.pipe(
                ignoreElements(),
                catchError(error => of(actions.ajaxError(error)))
            )
        })
    );
};
