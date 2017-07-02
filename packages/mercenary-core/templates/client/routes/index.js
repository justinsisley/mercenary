import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import RootScreen from '../containers/RootScreen';
import logout from '../utils/logout';

import {
  UsersScreen,
  UserDetailScreen,
  LoginScreen,
  CompleteLogin,
} from './async';

export default (
  <Switch>
    <Route exact path="/" component={RootScreen} />

    <Route exact path="/users" component={UsersScreen} />
    <Route exact path="/users/:userId" component={UserDetailScreen} />

    <Route exact path="/login" component={LoginScreen} />
    <Route exact path="/login/:token" component={CompleteLogin} />
    <Route exact path="/logout" render={logout} />

    {/* 404 not possible, we just redirect back to root */}
    <Redirect to="/" />
  </Switch>
);
