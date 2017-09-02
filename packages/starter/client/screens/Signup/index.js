import React from 'react';
import DocumentTitle from 'react-document-title';
import SignupHero from '../../components/SignupHero';
import PublicFooter from '../../components/PublicFooter';

function SignupScreen() {
  return (
    <DocumentTitle title="Mercenary: Signup">
      <div>
        <SignupHero />
        <PublicFooter />
      </div>
    </DocumentTitle>
  );
}

export default SignupScreen;
