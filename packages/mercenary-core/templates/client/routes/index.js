import React from 'react';
import { Route } from 'react-router-dom';
import AppLayout from '../components/AppLayout';
import OrdersScreen from '../containers/OrdersScreen';
import UsersScreen from '../containers/UsersScreen';
import TodosScreen from '../containers/TodosScreen';
import LoginScreen from '../screens/LoginScreen/async';

// This object holds all of the information about our nav menu routes.
// We re-use this data when rendering the NavMenu.
// This could be put into a store, but it's more configuration than state.
export const navItems = [
  {
    position: 0,
    path: '/',
    exact: true,
    label: 'Orders',
    component: OrdersScreen,
  },
  {
    position: 1,
    path: '/users',
    label: 'Users',
    component: UsersScreen,
  },
  {
    position: 2,
    path: '/todos',
    label: 'Todos',
    component: TodosScreen,
  },
];

// Sort an array of objects by their "position" property
export function sortByPosition(a, b) {
  const positionA = a.position;
  const positionB = b.position;

  if (positionA > positionB) {
    return 1;
  }
  if (positionA < positionB) {
    return -1;
  }

  return 0;
}

// Create a route from a nav item object
function mapNavItemToRoute(navItem) {
  const key = `${navItem.path}-${navItem.position}`;

  return (
    <Route
      key={key}
      exact={navItem.exact}
      path={navItem.path}
      component={navItem.component}
    />
  );
}

// Create the route components in order of their position
const routes = navItems.sort(sortByPosition).map(mapNavItemToRoute);

export default (
  <div>
    <Route path="/login" component={LoginScreen} />

    <AppLayout>
      {routes}
    </AppLayout>
  </div>
);
