import {ActionType} from 'enums';

export default function(state = [], action) {
    switch(action.type) {
        // case ActionType.AUTH_LOGIN:
        //     return {
        //         ...state
        //     };
        case ActionType.AUTH_SUCCESS:
            // {active: true, admin: true, apikey: null, name: "andrew", settings: {}, user: true}
            
            return {
                ...state,
                authenticated: true,
                username: action.payload.name,
                apikey: action.payload.apikey
            };
        case ActionType.AUTH_FAILURE:
            console.log('login failure');
            return {
                ...state,
                authenticated: false,
                message: "username or password is not correct"
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
