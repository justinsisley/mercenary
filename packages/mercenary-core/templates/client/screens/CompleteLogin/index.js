import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Grid, Loader } from 'semantic-ui-react';

function CompleteLogin(props) {
  const { token } = props.match.params;

  if (!token) {
    return <Redirect to="/login" />;
  }

  props.verifyLoginToken(token);

  return (
    <DocumentTitle title="Mercenary: Login">
      <Grid centered columns={12}>
        <Grid.Column width={3}>
          <div style={{ marginTop: 200 }}>
            <Loader size="large" active>Logging in...</Loader>
          </div>
        </Grid.Column>
      </Grid>
    </DocumentTitle>
  );
}

CompleteLogin.propTypes = {
  match: propTypes.shape({
    params: propTypes.shape({
      token: propTypes.string,
    }),
  }),

  verifyLoginToken: propTypes.func,
};

CompleteLogin.defaultProps = {
  match: {
    params: {
      token: '',
    },
  },

  verifyLoginToken: () => {},
};

export default CompleteLogin;
