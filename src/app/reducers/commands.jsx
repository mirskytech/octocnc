import { CommandStatus, ActionType } from '../enums';

export default function(state = [], action) {
    switch(action.type) {
        case ActionType.AVAILABLE_SYSTEM_COMMANDS:
            return {...state};

        case ActionType.COMMAND_HISTORY_DATA:
            return {
                ...state,
                history: action.payload.history.map((el, idx) => {
                    return {
                        'command': el.command,
                        'status': CommandStatus.enumValueOf(el.status),
                        'date': el.executed_on
                    }
                })
            };

        case ActionType.EXECUTE_COMMAND:
            let previous_history = state.history || [];
            let history = [ ...previous_history, {
                'command': action.payload,
                'status': CommandStatus.COMPLETED,
                'date': new Date()

            }];

            return {
                ...state,
                history: history
            };

        default:
            return {...state, 'available_commands': [
                {command: 'G17 G20 G90 G94 G54', status: CommandStatus.COMPLETED},
                {command: 'G0 Z0.25', status: CommandStatus.COMPLETED},
                {command: 'X-0.5 Y0.', status: CommandStatus.SKIPPED},
                {command: 'Z0.1', status: CommandStatus.ERROR},
                {command: 'G01 Z0. F5.', status: CommandStatus.ACTIVE },
                {command: 'G02 X0. Y0.5 I0.5 J0. F2.5', status: CommandStatus.PENDING },
                {command: 'X0.5 Y0. I0. J-0.5', status: CommandStatus.PENDING },
                {command: 'X0. Y-0.5 I-0.5 J0.', status: CommandStatus.PENDING},
                {command: 'X-0.5 Y0. I0. J0.5', status: CommandStatus.PENDING },
                {command: 'G01 Z0.1 F5.', status: CommandStatus.PENDING },
                {command: 'G00 X0. Y0. Z0.25', status: CommandStatus.PENDING }
                ]};
    }
}
