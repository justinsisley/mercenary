import React from 'react';
import propTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import UserDetail from '../../components/UserDetail';

class UserDetailScreen extends React.Component {
  static propTypes = {
    match: propTypes.shape(),
    users: propTypes.shape(),
    getUser: propTypes.func,
  }

  static defaultProps = {
    match: {
      params: {},
    },
    users: {},
    getUser() {},
  }

  componentWillMount() {
    const { userId } = this.props.match.params;
    const user = this.props.users[userId];

    if (!user) {
      this.props.getUser(userId);
    }
  }

  render() {
    const { userId } = this.props.match.params;
    const user = this.props.users[userId];

    return (
      <DocumentTitle title="Mercenary: User Detail">
        <Grid columns={1}>
          <Grid.Column>
            <h1>User Detail</h1>

            <UserDetail user={user} />
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default UserDetailScreen;
