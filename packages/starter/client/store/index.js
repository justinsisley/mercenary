import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers';
import api from './api';

const middleware = compose(
  applyMiddleware(thunk.withExtraArgument(api)),
  window.devToolsExtension ? window.devToolsExtension() : f => f,
);

export default function configureStore() {
  const store = createStore(rootReducer, middleware);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}

// Export an instance of the store for convenience
export const instance = configureStore();
