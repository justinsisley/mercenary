import React from 'react';
import { Form, Message, Button } from 'semantic-ui-react';
import validator from 'validator';
import status from '../../constants/status';

class UserForm extends React.Component {
  static defaultProps = {
    user: {},
    userActions: {},
  }

  static propTypes = {
    user: React.PropTypes.shape(),
    userActions: React.PropTypes.shape(),
  }

  state = {
    error: false,
  }

  handleSubmit = (e, { formData }) => {
    e.preventDefault();

    const validUserId = validator.isInt(formData.userId, { min: 1, max: 9 });

    if (!validUserId) {
      this.setState({ error: true });
      return;
    }

    this.setState({ error: false });
    this.props.userActions.fetchUserById(formData.userId);
  }

  render() {
    const loading = this.props.user._status === status.FETCHING;

    return (
      <Form
        error={this.state.error}
        onSubmit={this.handleSubmit}
      >
        <Form.Field>
          <label htmlFor="label-user-id">User ID</label>

          <Form.Input
            name="userId"
            id="input-user-id"
            placeholder="User ID"
          />

          <Message
            error
            header="Form Error"
            content="You must enter a user ID between 1 and 9."
          />
        </Form.Field>

        <Form.Field>
          <Button
            primary
            loading={loading}
          >Fetch User</Button>
        </Form.Field>
      </Form>
    );
  }
}

export default UserForm;
