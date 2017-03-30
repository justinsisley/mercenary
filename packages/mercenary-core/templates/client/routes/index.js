import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

// Enable bundle splitting on routes
const HomeScreen = asyncComponent({
  resolve: () => import('../containers/HomeScreen'),
});

export default (
  <BrowserRouter>
    <Switch>
      <Route path="/" component={HomeScreen} />

      {/* 404 not possible, we just redirect back to root */}
      <Redirect from="*" to="/" />
    </Switch>
  </BrowserRouter>
);
