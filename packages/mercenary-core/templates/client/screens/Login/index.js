import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import LoginHero from '../../components/LoginHero';
import PublicFooter from '../../components/PublicFooter';

function LoginScreen(props) {
  if (props.token) {
    return <Redirect to="/" />;
  }

  return (
    <DocumentTitle title="Mercenary: Login">
      <div>
        <LoginHero />
        <PublicFooter />
      </div>
    </DocumentTitle>
  );
}

LoginScreen.propTypes = {
  token: propTypes.string,
};

LoginScreen.defaultProps = {
  token: '',
};

export default LoginScreen;
