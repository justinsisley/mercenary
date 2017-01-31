import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import rootReducer from './reducers';
import api from './api';

// Does nothing now, but could retrive state rendered to the DOM by the server
const getInitialState = () => {};

export default function configureStore(browserHistory) {
  const router = routerMiddleware(browserHistory);
  const store = createStore(
    rootReducer,
    getInitialState(),
    compose(
      applyMiddleware(thunk.withExtraArgument(api), router),
      window.devToolsExtension ? window.devToolsExtension() : f => f,
    ),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
