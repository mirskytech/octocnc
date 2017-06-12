// @flow

import 'rxjs';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createHistory } from 'history';
import { Router, Route, IndexRoute, useRouterHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './configure_store';
import App from './containers/app';
import './semantic/dist/semantic.min.css';
import 'basscss-typography/index.css';
import 'basscss-margin/index.css';
import 'basscss-align/index.css';

import Dash from './containers/dash';

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

const browserHistory = useRouterHistory(createHistory)({
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
        action.type = msg.data.type.replace(/([a-z\d])([A-Z])/g, '$1_$2').toUpperCase();
        action.payload = msg.data.payload;
    } else {
        action.type = "SOCKET_" + msg.event.toUpperCase();
        action.payload = msg.data;
    }
    console.log(action);
    store.dispatch(action);
});

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={App}>
        <IndexRoute component={Dash} />
        <Route path="dash" component={Dash} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('.app')
);
