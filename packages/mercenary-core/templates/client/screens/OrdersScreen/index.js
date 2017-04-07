import _ from 'lodash';
import faker from 'faker';
import React from 'react';
import TimeAgo from 'timeago-react';
import DocumentTitle from 'react-document-title';
import { Grid, Button, Checkbox, Icon, Table } from 'semantic-ui-react';

class OrdersScreen extends React.Component {
  static propTypes = {
    getUsers: React.PropTypes.func.isRequired,
    users: React.PropTypes.shape(),
  }

  static defaultProps = {
    users: [],
  }

  componentWillMount() {
    this.props.getUsers();
  }

  render() {
    let rows = null;

    if (!_.isEmpty(this.props.users)) {
      const ids = Object.keys(this.props.users);

      rows = ids.map((id) => {
        const user = this.props.users[id];

        return (
          <Table.Row key={user.email}>
            <Table.Cell collapsing>
              <Checkbox />
            </Table.Cell>

            <Table.Cell>{user.name}</Table.Cell>

            <Table.Cell>
              <TimeAgo datetime={faker.date.recent()} />
            </Table.Cell>

            <Table.Cell>{user.email}</Table.Cell>

            <Table.Cell>{faker.random.boolean() ? 'Yes' : 'No'}</Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <DocumentTitle title="Orders">
        <Grid columns={1}>
          <Grid.Column>
            <h1>Orders</h1>

            <Table celled definition>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Order Received</Table.HeaderCell>
                  <Table.HeaderCell>E-mail address</Table.HeaderCell>
                  <Table.HeaderCell>Premium Plan</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>{rows}</Table.Body>

              <Table.Footer fullWidth>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell colSpan="4">
                    <Button
                      icon
                      floated="right"
                      labelPosition="left"
                      size="small"
                      color="green"
                    >
                      <Icon name="user" /> Upgrade User
                    </Button>

                    <Button size="small">Approve</Button>

                    <Button disabled size="small">Approve All</Button>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}

export default OrdersScreen;
