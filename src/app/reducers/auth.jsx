import {ActionType} from 'enums';

export default function(state = [], action) {
    switch(action.type) {
        case ActionType.AUTH_LOGIN:
            return {
                ...state,
                username: action.username
            };
        case ActionType.AUTH_SUCCESS:
            return {
                ...state,
                authenticated: true
            };
        case ActionType.AUTH_LOGOUT:
            return {
                ...state,
                authenticated: false,
                username: null
            };
        default:
            return {...state};
    }
};