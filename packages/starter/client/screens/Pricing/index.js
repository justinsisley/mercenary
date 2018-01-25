import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import PublicHero from '../../components/PublicHero';
import PricingContent from '../../components/PricingContent';
import PublicFooter from '../../components/PublicFooter';

function PricingScreen() {
  return (
    <DocumentTitle title="Mercenary: Pricing">
      <Fragment>
        <PublicHero title="Simple Pricing for Companies of Every Size" />

        <PricingContent />
        <PublicFooter />
      </Fragment>
    </DocumentTitle>
  );
}

export default PricingScreen;
