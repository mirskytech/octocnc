// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { browserHistory } from 'react-router';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import rootReducer from './reducers';
import { rootEpic } from './epics';

import { ajax } from 'rxjs/observable/dom/ajax';

// export default function configureStore(socket: WebSocket, initialState: Object) {
//   const epicMiddleware = createEpicMiddleware(rootEpic, {
//       dependencies: {
//         getJSON: ajax.getJSON
//       }
//   });
//   const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
//   const store = createStore(
//     rootReducer,
//     initialState,
//     composeEnhancers(
//       applyMiddleware(
//         epicMiddleware,
//         routerMiddleware(browserHistory)
//       )
//     )
//   );
//   return store;
// }


// import { ConnectedRouter, routerReducer, routerMiddleware, push } from 'react-router-redux'

export default function configureStore(socket, initialState) {

    const epicMiddleware = createEpicMiddleware(rootEpic, {
        dependencies: {
            socket: socket,
            initialState: initialState
        }
    });

    const store = createStore(
        rootReducer,
        routerReducer,
        applyMiddleware(epicMiddleware)
    );


  return store;
}
