import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import LoginForm from '../../containers/LoginForm';

function LoginScreen(props) {
  if (props.token) {
    return <Redirect to="/" />;
  }

  return (
    <DocumentTitle title="Login">
      <Grid centered columns={12}>
        <Grid.Column width={3}>
          <LoginForm />
        </Grid.Column>
      </Grid>
    </DocumentTitle>
  );
}

LoginScreen.propTypes = {
  token: propTypes.string,
};

LoginScreen.defaultProps = {
  token: '',
};

export default LoginScreen;
