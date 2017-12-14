import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { instance as store } from '../../store';
import routes from '../../routes';

export default function App() {
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        {routes}
      </BrowserRouter>
    </ReduxProvider>
  );
}
