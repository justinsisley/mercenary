import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import PrivacyHero from '../../components/PrivacyHero';
import PublicFooter from '../../components/PublicFooter';

function PrivacyScreen() {
  return (
    <DocumentTitle title="Mercenary: Privacy Policy and Terms of Service">
      <Fragment>
        <PrivacyHero />
        <PublicFooter />
      </Fragment>
    </DocumentTitle>
  );
}

export default PrivacyScreen;
