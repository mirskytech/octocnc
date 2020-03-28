import {ActionType} from '../enums';

export default function(state = [], action) {
    switch(action.type) {
        case ActionType.DEVICE_STATE:
            return { ...state };
        case ActionType.POSITION_UPDATE:
            if(
                state.current.x !== action.payload.x ||
                state.current.y !== action.payload.y ||
                state.current.z !== action.payload.z
            ) {
                const pt = { x:action.payload.x, y:action.payload.y, z:action.payload.z};

                return {
                    ...state,
                    current: pt,
                    traversal: state.traversal.push(pt)
                };
            }
            return { ...state };
        default:
            return { ...state };
    }
};