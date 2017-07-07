import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { AsyncComponentProvider } from 'react-async-component';
import { instance as store } from '../../store';
import routes from '../../routes';

export default function App() {
  return (
    <AsyncComponentProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </ReduxProvider>
    </AsyncComponentProvider>
  );
}
