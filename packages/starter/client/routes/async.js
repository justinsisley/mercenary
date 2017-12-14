/**
 * This pattern allows us to compile each screen as its own bundle, and only
 * download them when they're needed. Wrapping the async components in higher-order
 * auth and layout components here allows those higher-order components to be
 * part of the shared core bundle. If we were to wrap the screens with the HOC's
 * in the screen components themselves, the HOC's code would be bundled into each
 * screen bundle.
 */
import React from 'react';
import loadable from 'loadable-components';
import AppLayout from '../components/AppLayout';
import RequireAuth from '../containers/RequireAuth';
import RequireNoAuth from '../containers/RequireNoAuth';

export function FeaturesScreen(props) {
  const AsyncComponent = loadable(() => import('../screens/Features'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}

export function PricingScreen(props) {
  const AsyncComponent = loadable(() => import('../screens/Pricing'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}

export function UsersScreen(props) {
  const AsyncComponent = loadable(() => import('../containers/UsersScreen'));

  return (
    <RequireAuth>
      <AppLayout>
        <AsyncComponent {...props} />
      </AppLayout>
    </RequireAuth>
  );
}

export function UserDetailScreen(props) {
  const AsyncComponent = loadable(() => import('../containers/UserDetailScreen'));

  return (
    <RequireAuth>
      <AppLayout>
        <AsyncComponent {...props} />
      </AppLayout>
    </RequireAuth>
  );
}

export function LoginScreen(props) {
  const AsyncComponent = loadable(() => import('../containers/LoginScreen'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}

export function CompleteLogin(props) {
  const AsyncComponent = loadable(() => import('../containers/CompleteLoginScreen'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}

export function SignupScreen(props) {
  const AsyncComponent = loadable(() => import('../screens/Signup'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}

export function PrivacyScreen(props) {
  const AsyncComponent = loadable(() => import('../screens/Privacy'));

  return (
    <RequireNoAuth>
      <AsyncComponent {...props} />
    </RequireNoAuth>
  );
}
