import React from 'react';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';

class LoginScreen extends React.Component {
  login = () => {}

  render() {
    return (
      <DocumentTitle title="Mercenary | Login">
        <Grid columns={1}>
          <Grid.Column>
            <h1>Login</h1>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default LoginScreen;
