import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

function RequireNoAuth(props) {
  if (props.token) {
    return <Redirect to="/" />;
  }

  return <div>{props.children}</div>;
}

RequireNoAuth.propTypes = {
  token: propTypes.string,
  children: propTypes.node,
};

RequireNoAuth.defaultProps = {
  token: '',
  children: null,
};

export default RequireNoAuth;
