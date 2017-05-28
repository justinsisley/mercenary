import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function RequireAuth(props) {
  if (!props.token) {
    return <Redirect to="/login" />;
  }

  return <div>{props.children}</div>;
}

RequireAuth.propTypes = {
  token: propTypes.string,
  children: propTypes.node,
};

RequireAuth.defaultProps = {
  token: '',
  children: null,
};

export default RequireAuth;
