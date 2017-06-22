import {Enum} from 'enumify';

export class ActionName extends Enum {}

// use the object init format. seems that jetbrains can tab complete then
ActionName.initEnum({
    'REQUEST_DEVICE_CONNECTIONS': {},
    'DEVICE_CONNECTION_INFO':{},
    'AJAX_ERROR':{},
    'CONNECT_TO_DEVICE':{},
    'DISCONNECT_FROM_DEVICE':{},
    'DISCONNECTING':{},
    'DISCONNECTED':{},
    'CONNECTING':{},
    'CONNECTED':{},
    'REQUEST_SYSTEM_COMMANDS': {},
    'AVAILABLE_SYSTEM_COMMANDS': {},
    'EXECUTE_COMMAND': {}
});
