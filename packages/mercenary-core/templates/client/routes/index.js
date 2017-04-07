import React from 'react';
import { Route } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';
import AppLayout from '../components/AppLayout';
import LoginScreen from '../containers/LoginScreen';
import { hoc } from '../utils/auth';

// What we get with the pattern below:
// - JavaScript bundles split by route
// - Flexible layout components that are independent from the individual routes
function OrdersScreen(props) {
  const AyncComponent = asyncComponent({
    resolve: () => import('../containers/OrdersScreen'),
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

export default (
  <div>
    <Route exact path="/" component={hoc.requireAuth(OrdersScreen)} />
    <Route path="/users" component={hoc.requireAuth(UsersScreen)} />
    <Route path="/todos" component={hoc.requireAuth(TodosScreen)} />
    <Route path="/login" component={hoc.requireNoAuth(LoginScreen)} />
  </div>
);
