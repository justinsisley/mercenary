import React from 'react';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';

function CompaniesScreen() {
  return (
    <DocumentTitle title="Mercenary | Companies">
      <Grid columns={4}>
        <Grid.Column>
          <h1>Companies</h1>
        </Grid.Column>
      </Grid>
    </DocumentTitle>
  );
}

export default CompaniesScreen;
