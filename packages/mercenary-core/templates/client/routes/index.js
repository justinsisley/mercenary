import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import HomeScreen from '../containers/HomeScreen';

export default (
  <span>
    <Route path="/" exact component={HomeScreen} />

    {/* 404 not possible, we just redirect back to root */}
    <Redirect from="*" to="/" />
  </span>
);
