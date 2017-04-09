import _ from 'lodash';
import React from 'react';
import propTypes from 'prop-types';
import DocumentTitle from 'react-document-title';
import { Grid, Table, Checkbox } from 'semantic-ui-react';

class TodosScreen extends React.Component {
  static propTypes = {
    getUsers: propTypes.func.isRequired,
    users: propTypes.shape(),
    getTodos: propTypes.func.isRequired,
    todos: propTypes.shape(),
  }

  static defaultProps = {
    users: [],
    todos: [],
  }

  componentWillMount() {
    this.props.getUsers();
    this.props.getTodos();
  }

  render() {
    let rows = null;
    const hasFetchedTodos = !_.isEmpty(this.props.todos);
    const hasFetchedUsers = !_.isEmpty(this.props.users);

    if (hasFetchedUsers && hasFetchedTodos) {
      const ids = Object.keys(this.props.todos);

      rows = ids.map((id) => {
        const todo = this.props.todos[id];

        return (
          <Table.Row key={todo.id} positive={todo.completed}>
            <Table.Cell>
              <Checkbox checked={todo.completed} />
            </Table.Cell>

            <Table.Cell>{todo.title}</Table.Cell>

            <Table.Cell>{this.props.users[todo.userId].email}</Table.Cell>
          </Table.Row>
        );
      });
    }

    return (
      <DocumentTitle title="Todos">
        <Grid columns={1}>
          <Grid.Column>
            <h1>Todos</h1>

            <Table celled definition>
              <Table.Header fullWidth>
                <Table.Row>
                  <Table.HeaderCell>Completed</Table.HeaderCell>
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>User</Table.HeaderCell>
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


export default TodosScreen;
