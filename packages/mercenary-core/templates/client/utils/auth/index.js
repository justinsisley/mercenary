import React from 'react';
import { Redirect } from 'react-router';
import { instance as store } from '../../store';

// Auth-related higher-order components
export const hoc = {
  requireAuth(Component) {
    return function RequireAuth(props) {
      const { session } = store.getState();

      if (!session.token) {
        return <Redirect to="/login" />;
      }

      return <Component {...props} />;
    };
  },

  requireNoAuth(Component) {
    return function RequireNoAuth(props) {
      const { session } = store.getState();

      if (session.token) {
        return <Redirect to="/" />;
      }

      return <Component {...props} />;
    };
  },
};

export default {
  hoc,
};
