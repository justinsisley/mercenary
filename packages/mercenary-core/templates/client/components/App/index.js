import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import { AsyncComponentProvider } from 'react-async-component';
import configureStore from '../../store';
import routes from '../../routes';
import Layout from '../Layout';

// Create store instance
const store = configureStore();

export default function App() {
  return (
    <AsyncComponentProvider>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <Layout>{routes}</Layout>
        </BrowserRouter>
      </ReduxProvider>
    </AsyncComponentProvider>
  );
}
