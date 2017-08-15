import React from 'react';
import propTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import Charts from '../../components/Charts';

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
    if (!this.props.jwt.email) {
      this.props.verifySessionToken();
    }
  }

  render() {
    return (
      <DocumentTitle title="Mercenary: Dashboard">
        <Grid columns={1}>
          <Grid.Column>
            <h1>Dashboard</h1>

            <p>Logged in as: <strong>{this.props.jwt.email}</strong></p>

            <Charts />
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default DashboardScreen;
