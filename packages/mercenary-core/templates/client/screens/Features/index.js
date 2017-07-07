import React from 'react';
import DocumentTitle from 'react-document-title';
import FeaturesHero from '../../components/FeaturesHero';
import FeaturesContent from '../../components/FeaturesContent';
import PublicFooter from '../../components/PublicFooter';

function FeaturesScreen() {
  return (
    <DocumentTitle title="Mercenary: Features">
      <div>
        <FeaturesHero />
        <FeaturesContent />
        <PublicFooter />
      </div>
    </DocumentTitle>
  );
}

export default FeaturesScreen;
