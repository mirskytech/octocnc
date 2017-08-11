import { ActionType } from '../enums';

export default function(state = [], action) : any {

    switch(action.type) {
        case ActionType.POSITION_UPDATE:
            return {
                X: action.payload.x,
                Y: action.payload.y,
                Z: action.payload.z
            };
        default:
            return { ...state };
    }
}