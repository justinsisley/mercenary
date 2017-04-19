// Don't create a SignupToken entity, just have a property on the User
// Also have a "verified" property on the user
// If the user doesn't verify the account within a certain amount of time, delete the account

import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';

class VerifyScreen extends React.Component {
  static propTypes = {
    match: propTypes.shape(),
    verifyAccount: propTypes.func,
  }

  static defaultProps = {
    match: { params: { token: null } },
    verifyAccount: () => {},
  }

  state = {
    token: null,
  }

  componentWillMount() {
    const { params: { token } } = this.props.match;

    this.setState({ token });

    this.props.verifyAccount(token);
  }

  render() {
    if (!this.state.token) {
      return <Redirect to="/signup" />;
    }

    return (
      <DocumentTitle title="Mercenary | Account Verification">
        <Grid centered columns={12}>
          <Grid.Column width={3}>
            <div>Verifying account...</div>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default VerifyScreen;
