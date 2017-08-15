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
// // import 'font-awesome/scss/font-awesome.scss';
//
//
// // get server configuration from rendered page
// const el = document.getElementById('_server_config');
// const config = JSON.parse(el ? el.innerHTML : '{}');
//
// // configure octoprint api & socket
// OctoPrint = window.OctoPrint;
// OctoPrint.options.baseurl = config.base_uri;
// OctoPrint.options.apikey = config.api_key;
//
// // open the socket and create store
// // const client_socket = OctoPrint.socket.connect({debug: true});
// // const store = configureStore(client_socket, {'config':config});
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


import React from 'react'
import ReactDOM from 'react-dom'

import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'

// import createHistory from 'history/createBrowserHistory'
import createHistory from 'history/createHashHistory';
// import { Route } from 'react-router'

import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

import reducers from './reducers' // Or wherever you keep your reducers

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory()

// Build the middleware for intercepting and dispatching navigation actions
const middleware = routerMiddleware(history)

// Add the reducer to your store on the `router` key
// Also apply our middleware for navigating
const store = createStore(
  combineReducers({
    ...reducers,
    router: routerReducer
  }),
  applyMiddleware(middleware)
);

// Now you can dispatch navigation actions from anywhere!
// store.dispatch(push('/foo'))

import App  from './containers/app';
import configureStore from "./configure_store";


ReactDOM.render(
    <Provider store={store}>
        <App history={history}/>
    </Provider>,
  document.querySelector('.app')
);