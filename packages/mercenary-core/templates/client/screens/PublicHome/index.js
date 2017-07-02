import React from 'react';
import DocumentTitle from 'react-document-title';
import PublicHomeHero from '../../components/PublicHomeHero';
import PublicHomeContent from '../../components/PublicHomeContent';
import PublicFooter from '../../components/PublicFooter';

function PublicHomeScreen() {
  return (
    <DocumentTitle title="Mercenary">
      <div>
        <PublicHomeHero />
        <PublicHomeContent />
        <PublicFooter />
      </div>
    </DocumentTitle>
  );
}

export default PublicHomeScreen;
