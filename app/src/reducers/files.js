import {ActionType, Positioning, Units} from '../enums';

export default function(state = [], action) {

    switch (action.type) {
        case ActionType.FILE_LIST:
            return {
                ...state,
                list: action.payload.files,
                free: action.payload.free,
                total: action.payload.total
            };
        case ActionType.UPLOAD_PROGRESS:
            return {
                ...state,
                upload_progress:action.payload.percentage
            };
        case ActionType.UPLOAD_COMPLETE:
            return {
                ...state,
                upload_progress: 0
            };
        default:
            return {...state};
    }
}
