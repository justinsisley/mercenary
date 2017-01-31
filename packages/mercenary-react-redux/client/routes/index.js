import React from 'react';
import { Route, IndexRoute, Redirect } from 'react-router';
import HomeScreen from '../containers/HomeScreen';

export default (
  <Route path="/">
    <IndexRoute component={HomeScreen} />

    {/* 404 not possible, we just redirect back to root */}
    <Redirect from="*" to="/" />
  </Route>
);
