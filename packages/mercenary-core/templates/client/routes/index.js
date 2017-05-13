import React from 'react';
import { Route } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import AppLayout from '../components/AppLayout';
import { hoc } from '../utils/auth';

// What we get with the pattern below:
// - JavaScript bundles split by route
// - Flexible layout components that are independent from the individual routes
function DashboardScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../containers/DashboardScreen'),
  });

  return (
    <AppLayout>
      <AyncComponent {...props} />
    </AppLayout>
  );
}

function UsersScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../containers/UsersScreen'),
  });

  return (
    <AppLayout>
      <AyncComponent {...props} />
    </AppLayout>
  );
}

function TodosScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../containers/TodosScreen'),
  });

  return (
    <AppLayout>
      <AyncComponent {...props} />
    </AppLayout>
  );
}

function LoginScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../screens/LoginScreen'),
  });

  return <AyncComponent {...props} />;
}

function SignupScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../screens/SignupScreen'),
  });

  return <AyncComponent {...props} />;
}

function VerifyScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../containers/VerifyScreen'),
  });

  return <AyncComponent {...props} />;
}

function GameScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../containers/GameScreen'),
  });

  return <AyncComponent {...props} />;
}

export default (
  <div>
    <Route exact path="/" component={hoc.requireAuth(DashboardScreen)} />
    <Route path="/users" component={hoc.requireAuth(UsersScreen)} />
    <Route path="/todos" component={hoc.requireAuth(TodosScreen)} />

    <Route path="/login" component={hoc.requireNoAuth(LoginScreen)} />
    <Route path="/signup" component={hoc.requireNoAuth(SignupScreen)} />

    <Route path="/verify/:token" component={hoc.requireNoAuth(VerifyScreen)} />

    <Route path="/game" component={GameScreen} />
  </div>
);
