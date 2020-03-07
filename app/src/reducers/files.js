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
        default:
            return {...state};
    }
}
