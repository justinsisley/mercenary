import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import LoginHero from '../../components/LoginHero';
import PublicFooter from '../../components/PublicFooter';

function LoginScreen() {
  return (
    <DocumentTitle title="Mercenary: Login">
      <Fragment>
        <LoginHero />
        <PublicFooter />
      </Fragment>
    </DocumentTitle>
  );
}

export default LoginScreen;
