import 'rxjs';
// import React from 'react';
// import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux';
// import { createStore, combineReducers, applyMiddleware } from 'redux';
// import createHistory from 'history/createBrowserHistory'
// import { Route } from 'react-router-dom';
//
//
// import { createHashHistory } from 'history';
//
// // import { syncHistoryWithStore } from 'react-router-redux';
//
// import configureStore from './configure_store';
// import App from './containers/app';
//
// // import 'basscss-typography/index.css';
// // import 'basscss-margin/index.css';
// // import 'basscss-padding/index.css';
// // import 'basscss-align/index.css';
// // import 'basscss-type-scale/index.css';
//
//
// // get server configuration from rendered page
const el = document.getElementById('_server_config');
const config = JSON.parse(el ? el.innerHTML : '{}');
const initialState = {'config':config};
//
// // configure octoprint api & socket
OctoPrint = window.OctoPrint;
OctoPrint.options.baseurl = config.base_uri;
OctoPrint.options.apikey = config.api_key;

// open the socket and create store
const octo_socket = OctoPrint.socket.connect({debug: true});
// const store = configureStore(client_socket, {'config':config});
//
//
//
// // Build the middleware for intercepting and dispatching navigation actions
// const middleware = routerMiddleware(history);
//
// // Add the reducer to your store on the `router` key
// // Also apply our middleware for navigating
// const store = createStore(
//   combineReducers({
//     // ...reducers,
//     router: routerReducer
//   }),
//   applyMiddleware(middleware)
// );
//
//
// const history = createHistory();
//
//
// //
// // const history = createHashHistory({
// //    basename: '/'
// // });
//
// // const browserHistory = useRouterHistory(createHashHistory)({
// //     basename: '/'
// // });
//
// // const history = syncHistoryWithStore(
// //   browserHistory,
// //   store
// // );
//
// // for messages received, transform into redux format and dispatch
// // OctoPrint.socket.onMessage("*", (msg) => {
// //
// //     const action = {'action':'', 'payload':{}};
// //
// //     if(msg.event === 'event') {
// //         action.type = ActionType.enumValueOf(msg.data.type.replace(/([a-z\d])([A-Z])/g, '$1_$2').toUpperCase());
// //         action.payload = msg.data.payload;
// //     } else {
// //         action.type = ActionType.enumValueOf("SOCKET_" + msg.event.toUpperCase());
// //         action.payload = msg.data;
// //     }
// //
// //     if(action.type === undefined) {
// //         if (msg.event === "current") {
// //             return;
// //         }
// //         return;
// //     }
// //     store.dispatch(action);
// // });
//
// ReactDOM.render(
//   <Provider store={store}>
//       <ConnectedRouter history={history}>
//         <div>
//             <Route exact path="/" render={() => { return(<h1>Home</h1>); }} />
//         <Route path="/about" render={() => { return(<h1>About</h1>); }}/>
//         <Route path="/topics" render={() => { return(<h1>Topics</h1>); }}/>
//       </div>
//       </ConnectedRouter>
//   </Provider>,
//   document.querySelector('.app')
// );

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import createHistory from 'history/createHashHistory';
import { routerReducer, routerMiddleware, push } from 'react-router-redux';
import rootReducer from './reducers';

import { ActionType } from 'enums';

const history = createHistory();

import { createEpicMiddleware } from 'redux-observable';
import { rootEpic } from './epics';


const epicMiddleware = createEpicMiddleware(
    rootEpic, { dependencies: {
        socket: octo_socket,
        initialState: initialState
    }});

const store = createStore(
  rootReducer,
  initialState,
  applyMiddleware(epicMiddleware)
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


import React from 'react'
import ReactDOM from 'react-dom'
import App  from './containers/app';

ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
  document.querySelector('.app')
);