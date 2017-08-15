import React from 'react';
import DocumentTitle from 'react-document-title';
import LoginHero from '../../components/LoginHero';
import PublicFooter from '../../components/PublicFooter';

function LoginScreen() {
  return (
    <DocumentTitle title="Mercenary: Login">
      <div>
        <LoginHero />
        <PublicFooter />
      </div>
    </DocumentTitle>
  );
}

export default LoginScreen;
