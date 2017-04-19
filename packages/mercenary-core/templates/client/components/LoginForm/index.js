import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Segment, Button, Form, Message } from 'semantic-ui-react';
import validator from 'validator';

class LoginForm extends React.Component {
  static propTypes = {
    error: propTypes.shape(),
    logIn: propTypes.func,
    token: propTypes.string,
  }

  static defaultProps = {
    error: null,
    logIn: () => {},
    token: '',
  }

  state = {
    email: '',
    emailError: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const isEmail = validator.isEmail(email);

    if (!email || !isEmail) {
      this.setState({ emailError: true });
      return;
    }

    this.setState({ emailError: false });

    this.props.logIn(email);
  }

  render() {
    if (this.props.token) {
      return <Redirect to="/" />;
    }

    const hasError = !!this.props.error || this.state.emailError;

    return (
      <Segment>
        <h2>Log In</h2>

        <Form error={hasError}>
          <Form.Field>
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              placeholder="you@domain.com"
              onChange={(e) => {
                this.setState({
                  email: e.target.value,
                  emailError: false,
                });
              }}
            />
          </Form.Field>

          <Message error content="Invalid email address" />

          <Button onClick={this.handleSubmit}>Continue</Button>
        </Form>
      </Segment>
    );
  }
}

export default LoginForm;
