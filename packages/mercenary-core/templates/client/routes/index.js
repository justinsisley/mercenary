import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import AppLayout from '../components/AppLayout';
import RequireAuth from '../containers/RequireAuth';
import RequireNoAuth from '../containers/RequireNoAuth';
import logout from '../utils/logout';

const loadAsync = resolve => asyncComponent({ resolve });

function DashboardScreen(props) {
  const AsyncComponent = loadAsync(() => import('../containers/DashboardScreen'));

  return (
    <RequireAuth>
      <AppLayout>
        <AsyncComponent {...props} />
      </AppLayout>
    </RequireAuth>
  );
}

function LoginScreen(props) {
  const AsyncComponent = loadAsync(() => import('../containers/LoginScreen'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}

function CompleteLogin(props) {
  const AsyncComponent = loadAsync(() => import('../containers/CompleteLoginScreen'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}

export default (
  <Switch>
    <Route exact path="/" component={DashboardScreen} />

    <Route exact path="/login" component={LoginScreen} />
    <Route exact path="/login/:token" component={CompleteLogin} />
    <Route exact path="/logout" render={logout} />

    {/* 404 not possible, we just redirect back to root */}
    <Redirect to="/" />
  </Switch>
);
