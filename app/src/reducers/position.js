import {ActionType, Positioning} from '../enums';

export default function(state = [], action) {

    switch(action.type) {
        case ActionType.POSITION_UPDATE:
            return {
                ...state,
                X: action.payload.x,
                Y: action.payload.y,
                Z: action.payload.z
            };
        case ActionType.SET_ABSOLUTE_POSITIONING:
            return {
                ...state,
                type: Positioning.ABSOLUTE
            };
        case ActionType.SET_RELATIVE_POSITIONING:
            return {
                ...state,
                type: Positioning.RELATIVE
            };
        case ActionType.SET_INCREMENTAL_POSITIONING:
            return {
                ...state,
                type: Positioning.INCREMENTAL
            };
        case ActionType.DEVICE_STATE:

            let p = Positioning.enumValueOf(action.payload.positioning.toUpperCase());
            return {
                ...state,
                type: p
            };
        default:
            return { ...state };
    }
};
