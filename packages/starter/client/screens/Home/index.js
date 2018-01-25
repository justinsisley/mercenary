import React, { Fragment } from 'react';
import DocumentTitle from 'react-document-title';
import PublicHero from '../../components/PublicHero';
import HomeContent from '../../components/HomeContent';
import PublicFooter from '../../components/PublicFooter';

function HomeScreen() {
  return (
    <DocumentTitle title="Mercenary: The force multiplier web application stack">
      <Fragment>
        <PublicHero
          title="Beef ribs chicken frankfurter"
          subTitle="Venison cupim flank ball tip short loin."
          buttonText="Learn More"
          buttonLink="/features"
        />

        <HomeContent />
        <PublicFooter />
      </Fragment>
    </DocumentTitle>
  );
}

export default HomeScreen;
