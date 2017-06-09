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


const el = document.getElementById('_server_config');
const config = JSON.parse(el ? el.innerHTML : '{}');

OctoPrint = window.OctoPrint;
OctoPrint.options.baseurl = config.base_uri;
OctoPrint.options.apikey = config.api_key;

OctoPrint.socket.onMessage("connected", function(data) {
    let payload = data.data;
    // OctoPrint.options.apikey = payload.apikey;
    //
    // // update the API key directly in jquery's ajax options too,
    // // to ensure the fileupload plugin and any plugins still using
    // // $.ajax directly still work fine too
    // UI_API_KEY = payload["apikey"];
    $.ajaxSetup({
        headers: {"X-Api-Key": payload.apikey}
    });

    // console.log("octoprint has connected");
    // console.log(data);

});

const client_socket = OctoPrint.socket.connect({debug: true});

const store = configureStore(client_socket, config);

const browserHistory = useRouterHistory(createHistory)({
    basename: '/'
});


const history = syncHistoryWithStore(
  browserHistory,
  store
);

// socket.listen(store.dispatch);

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
