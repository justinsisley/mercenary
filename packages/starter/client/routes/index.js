import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import ScrollToTop from '../components/ScrollToTop';
import RootScreen from '../containers/RootScreen';
import logout from '../utils/logout';

import {
  FeaturesScreen,
  PricingScreen,
  UsersScreen,
  UserDetailScreen,
  LoginScreen,
  CompleteLogin,
  SignupScreen,
  PrivacyScreen,
} from './async';

export default (
  <ScrollToTop>
    <Switch>
      <Route exact path="/" component={RootScreen} />

      <Route exact path="/features" component={FeaturesScreen} />
      <Route exact path="/pricing" component={PricingScreen} />

      <Route exact path="/users" component={UsersScreen} />
      <Route exact path="/users/:userId" component={UserDetailScreen} />

      <Route exact path="/login" component={LoginScreen} />
      <Route exact path="/login/:token" component={CompleteLogin} />
      <Route exact path="/logout" render={logout} />

      <Route exact path="/signup" component={SignupScreen} />

      <Route exact path="/privacy" component={PrivacyScreen} />

      {/* 404 not possible, we just redirect back to root */}
      <Redirect to="/" />
    </Switch>
  </ScrollToTop>
);
