import React from 'react';
import { Redirect } from 'react-router';

// NOTE: for dev only
const loggedIn = false;

// Auth-related higher-order components
export const hoc = {
  requireAuth(Component) {
    // eslint-disable-next-line
    return class extends React.Component {
      state = {
        loggedIn: false,
      }

      componentWillMount() {
        this.setState({ loggedIn });
      }

      render() {
        if (!this.state.loggedIn) {
          return <Redirect to="/login" />;
        }

        return <Component {...this.props} />;
      }
    };
  },

  requireNoAuth(Component) {
    // eslint-disable-next-line
    return class extends React.Component {
      state = {
        loggedIn: false,
      }

      componentWillMount() {
        this.setState({ loggedIn });
      }

      render() {
        if (this.state.loggedIn) {
          return <Redirect to="/" />;
        }

        return <Component {...this.props} />;
      }
    };
  },
};

export default {
  hoc,
};
