import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
// import mixpanel from 'mixpanel-browser';
// import config from './config';
import configureStore from './store';
import routes from './routes';

// Global libraries and styles
import './utils/global';

// Initialize MixPanel
// const mixpanelToken = config.get('mixPanelToken');
// mixpanel.init(mixpanelToken);

// Create store instance
const store = configureStore(browserHistory);

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store);

// Track history state changes
// history.listen(location => mixpanel.track('navigation', {
  // pathname: location.pathname,
// }));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes}
    </Router>
  </Provider>,
  document.getElementById('root'),
);
