import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';

class CompleteLogin extends React.Component {
  static propTypes = {
    match: propTypes.shape({
      params: propTypes.shape({
        token: propTypes.string,
      }),
    }),

    verifyLoginToken: propTypes.func,
  }

  static defaultProps = {
    match: {
      params: {
        token: '',
      },
    },

    verifyLoginToken: () => {},
  }

  state = {
    token: null,
  }

  render() {
    const { token } = this.props.match.params;

    if (!token) {
      return <Redirect to="/login" />;
    }

    this.props.verifyLoginToken(token);

    return (
      <DocumentTitle title="Account Verification">
        <Grid centered columns={12}>
          <Grid.Column width={3}>
            <div>Verifying account...</div>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default CompleteLogin;
