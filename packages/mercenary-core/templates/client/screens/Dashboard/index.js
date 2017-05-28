import React from 'react';
import propTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';

class DashboardScreen extends React.Component {
  static propTypes = {
    jwt: propTypes.shape({
      email: propTypes.string,
    }),

    verifySessionToken: propTypes.func,
  }

  static defaultProps = {
    jwt: {
      email: '',
    },

    verifySessionToken() {},
  }

  componentWillMount() {
    this.props.verifySessionToken();
  }

  render() {
    return (
      <DocumentTitle title="Dashboard">
        <Grid columns={1}>
          <Grid.Column>
            <h1>Dashboard</h1>

            <p>Logged in as: <strong>{this.props.jwt.email}</strong></p>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default DashboardScreen;
