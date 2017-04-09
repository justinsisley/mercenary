import _ from 'lodash';
import faker from 'faker';
import React from 'react';
import propTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid, Table, Image } from 'semantic-ui-react';

class UsersScreen extends React.Component {
  static propTypes = {
    getUsers: propTypes.func.isRequired,
    users: propTypes.shape(),
  }

  static defaultProps = {
    users: [],
  }

  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    let rows = null;
    const hasFetchedUsers = !_.isEmpty(this.props.users);

    if (hasFetchedUsers) {
      const ids = Object.keys(this.props.users);

      rows = ids.map((id) => {
        const user = this.props.users[id];
        const gender = faker.random.boolean() ? 'men' : 'women';
        const avatar = `https://randomuser.me/api/portraits/med/${gender}/${id}.jpg`;

        return (
          <Table.Row key={user.email}>
            <Table.Cell collapsing>
              <Image src={avatar} size="mini" />
            </Table.Cell>
            <Table.Cell>{user.name}</Table.Cell>
            <Table.Cell>{user.email}</Table.Cell>
            <Table.Cell>{user.phone}</Table.Cell>
            <Table.Cell>{user.company.name}</Table.Cell>
            <Table.Cell>{user.website}</Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <DocumentTitle title="Users">
        <Grid columns={1}>
          <Grid.Column>
            <h1>Users</h1>

            <Table celled definition striped>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>E-mail address</Table.HeaderCell>
                  <Table.HeaderCell>Phone</Table.HeaderCell>
                  <Table.HeaderCell>Company</Table.HeaderCell>
                  <Table.HeaderCell>Website</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{rows}</Table.Body>
            </Table>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default UsersScreen;
