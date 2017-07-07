import React from 'react';
import DocumentTitle from 'react-document-title';
import HomeHero from '../../components/HomeHero';
import HomeContent from '../../components/HomeContent';
import PublicFooter from '../../components/PublicFooter';
import backgroundImage from '../../images/home-hero.png';

function HomeScreen() {
  return (
    <DocumentTitle title="Mercenary: The force multiplier web application stack">
      <div>
        <HomeHero />
        <HomeContent />
        <PublicFooter backgroundImage={backgroundImage} />
      </div>
    </DocumentTitle>
  );
}

export default HomeScreen;
