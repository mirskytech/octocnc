import { ActionType } from '../enums';

export default function(state = [], action) {

    switch(action.type) {
        case ActionType.POSITION_UPDATE:
            return {
                ...state,
                X: action.payload.x,
                Y: action.payload.y,
                Z: action.payload.z
            };
        case ActionType.SET_POSITIONING:
            return {
                ...state,
                type: action.payload
            };
        default:
            return { ...state };
    }
};
