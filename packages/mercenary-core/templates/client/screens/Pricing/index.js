import React from 'react';
import DocumentTitle from 'react-document-title';
import PricingHero from '../../components/PricingHero';
import PricingContent from '../../components/PricingContent';
import PublicFooter from '../../components/PublicFooter';

function PricingScreen() {
  return (
    <DocumentTitle title="Mercenary: Pricing">
      <div>
        <PricingHero />
        <PricingContent />
        <PublicFooter />
      </div>
    </DocumentTitle>
  );
}

export default PricingScreen;
