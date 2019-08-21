import 'rxjs';

// get server configuration from rendered page
const el = document.getElementById('_server_config');
const config = JSON.parse(el ? el.innerHTML : '{}');
const initialState = {'config':config};

// configure octoprint api & socket
OctoPrint = window.OctoPrint;
OctoPrint.options.baseurl = config.base_uri;
OctoPrint.options.apikey = config.api_key;

// open the octoprint socket
const octo_socket = OctoPrint.socket.connect({debug: true});

// connect epics, including dependencies to be injected
import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';

const epicMiddleware = createEpicMiddleware(
    rootEpic, {
        dependencies: {
            socket: octo_socket,
            initialState: initialState
        }
    });

// create store
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(epicMiddleware)
);

// for messages received, transform into redux format and dispatch
import { ActionType } from 'enums';

OctoPrint.socket.onMessage("*", (msg) => {

    const action = {'action':'', 'payload':{}};

    if(msg.event === 'event') {
        action.type = ActionType.enumValueOf(msg.data.type.replace(/([a-z\d])([A-Z])/g, '$1_$2').toUpperCase());
        action.payload = msg.data.payload;
    } else {
        action.type = ActionType.enumValueOf("SOCKET_" + msg.event.toUpperCase());
        action.payload = msg.data;
    }

    if(action.type === undefined) {
        if (msg.event === "current") {
            return;
        }
        return;
    }
    store.dispatch(action);
});

// render the base component
import React from 'react';
import ReactDOM from 'react-dom';
import App  from './containers/app';
import { Provider } from 'react-redux'

import createHistory from 'history/createHashHistory';
const history = createHistory();

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
  document.querySelector('.app')
);