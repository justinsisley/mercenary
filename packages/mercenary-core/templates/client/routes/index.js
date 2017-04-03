import React from 'react';
import { Route } from 'react-router-dom';
import { asyncComponent } from 'react-async-component';

// Enable bundle splitting by route.
// This will cause webpack to output a core JS file with an additional file
// for each route defined here. The code `asyncComponent` calls below are
// intentionally un-DRY. webpack needs to see the explicit imports for bundle
// splitting to work.
const OrdersScreen = asyncComponent({
  resolve: () => import('../containers/OrdersScreen'),
});
const CompaniesScreen = asyncComponent({
  resolve: () => import('../containers/CompaniesScreen'),
});
const UsersScreen = asyncComponent({
  resolve: () => import('../containers/UsersScreen'),
});

export default (
  <div>
    <Route exact path="/" component={OrdersScreen} />
    <Route path="/companies" component={CompaniesScreen} />
    <Route path="/users" component={UsersScreen} />
  </div>
);
