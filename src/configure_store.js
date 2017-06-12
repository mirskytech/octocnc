// @flow

import { createStore, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import createRootEpic from './epics';

export default function configureStore(socket: WebSocket, initialState: Object) {
  const epicMiddleware = createEpicMiddleware(createRootEpic(socket, initialState));
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(
      applyMiddleware(
        epicMiddleware,
        routerMiddleware(browserHistory)
      )
    )
  );
  return store;
}
