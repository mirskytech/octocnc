import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './configure_store';
import App from './containers/app';
import 'basscss-typography/index.css';
import 'basscss-margin/index.css';
import 'basscss-padding/index.css';
import 'basscss-align/index.css';
import 'basscss-type-scale/index.css';
import 'font-awesome/scss/font-awesome.scss';
import {ActionType} from 'enums';
import Connection from 'containers/connection';
import DRO from 'containers/dro';
import CommandWindow from 'containers/commands';

// get server configuration from rendered page
const el = document.getElementById('_server_config');
const config = JSON.parse(el ? el.innerHTML : '{}');

// configure octoprint api & socket
OctoPrint = window.OctoPrint;
OctoPrint.options.baseurl = config.base_uri;
OctoPrint.options.apikey = config.api_key;

// open the socket and create store
const client_socket = OctoPrint.socket.connect({debug: true});
const store = configureStore(client_socket, {'config':config});

const browserHistory = useRouterHistory(createHashHistory)({
    basename: '/'
});

const history = syncHistoryWithStore(
  browserHistory,
  store
);

// for messages received, transform into redux format and dispatch
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

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Connection} />
          <Route path="connection" component={Connection} />
          <Route path="position" component={DRO} />
          <Route path="commands" component={CommandWindow} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.app')
);
