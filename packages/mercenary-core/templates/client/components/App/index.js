import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { AsyncComponentProvider } from 'react-async-component';
import configureStore from '../../store';
import routes from '../../routes';

// Create store instance
const store = configureStore();

export default function App() {
  return (
    <AsyncComponentProvider>
      <ReduxProvider store={store}>
        {routes}
      </ReduxProvider>
    </AsyncComponentProvider>
  );
}
