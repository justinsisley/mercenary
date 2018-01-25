import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import PublicHero from '../../components/PublicHero';
import FeaturesContent from '../../components/FeaturesContent';
import PublicFooter from '../../components/PublicFooter';

function FeaturesScreen() {
  return (
    <DocumentTitle title="Mercenary: Features">
      <Fragment>
        <PublicHero
          title="Ham hock jerky fatback frankfurter ham"
          subTitle="Venison cupim flank ball tip short loin."
          buttonText="Learn More"
          buttonLink="/features"
        />

        <FeaturesContent />
        <PublicFooter />
      </Fragment>
    </DocumentTitle>
  );
}

export default FeaturesScreen;
