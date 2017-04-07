import React from 'react';
import { Segment, Button, Checkbox, Form } from 'semantic-ui-react';

// eslint-disable-next-line
class LoginForm extends React.Component {
  render() {
    return (
      <Segment>
        <h2>Log In</h2>

        <Form>
          <Form.Field>
            <label htmlFor="username">Username</label>
            <input id="username" placeholder="Username" />
          </Form.Field>

          <Form.Field>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password" />
          </Form.Field>

          <Form.Field>
            <Checkbox label="Remember me" />
          </Form.Field>

          <Button>Log In</Button>
        </Form>
      </Segment>
    );
  }
}

export default LoginForm;
