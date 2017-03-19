import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store';
import routes from './routes';

// Global libraries and styles
import './utils/global';

// Create store instance
const store = configureStore();

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById('root'),
);
