import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import SignupHero from '../../components/SignupHero';
import PublicFooter from '../../components/PublicFooter';

function SignupScreen() {
  return (
    <DocumentTitle title="Mercenary: Signup">
      <Fragment>
        <SignupHero />
        <PublicFooter />
      </Fragment>
    </DocumentTitle>
  );
}

export default SignupScreen;
