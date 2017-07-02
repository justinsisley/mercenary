import React from 'react';
import propTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Table from '../../components/Table';

class UsersScreen extends React.Component {
  static propTypes = {
    users: propTypes.shape(),
    getUsers: propTypes.func,
  }

  static defaultProps = {
    users: {},
    getUsers() {},
  }

  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    const data = Object.keys(this.props.users).map((userId) => {
      const user = this.props.users[userId];

      return {
        Name: <Link to={`/users/${userId}`}>{user.name}</Link>,
        Username: <Link to={`/users/${userId}`}>{user.username}</Link>,
        Email: <Link to={`/users/${userId}`}>{user.email}</Link>,
      };
    });

    return (
      <DocumentTitle title="Mercenary: Users">
        <Grid columns={1}>
          <Grid.Column>
            <h1>Users</h1>

            <Table data={data} />
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default UsersScreen;
