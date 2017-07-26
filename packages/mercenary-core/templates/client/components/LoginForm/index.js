import React from 'react';
import propTypes from 'prop-types';
import { Segment, Form, Message, Button, Input } from 'semantic-ui-react';
import validator from 'validator';
import Conditional from '../Conditional';
import styles from './styles';

class LoginForm extends React.Component {
  static propTypes = {
    requestSuccess: propTypes.bool,
    requestFailedMessage: propTypes.string,

    requestLoginEmail: propTypes.func,
  }

  static defaultProps = {
    requestSuccess: false,
    requestFailedMessage: '',

    requestLoginEmail() {},
  }

  state = {
    email: '',
    validationError: '',
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email } = this.state;
    const isEmail = validator.isEmail(email);

    if (!email || !isEmail) {
      this.setState({
        validationError: 'Invalid email',
      });

      return;
    }

    this.setState({
      email,
      validationError: '',
    });

    this.props.requestLoginEmail(email);
  }

  handleInputChange = (e) => {
    this.setState({
      email: e.target.value,
      validationError: '',
    });
  }

  render() {
    const error = this.state.validationError || this.props.requestFailedMessage;

    return (
      <Segment
        className={styles.form}
        textAlign="center"
        vertical
      >
        <Conditional
          if={this.props.requestSuccess}
          then={(
            <div>
              <h2>Check your email</h2>

              <Message>
                A magic login link was sent to <b>{this.state.email}</b>
              </Message>
            </div>
          )}
          else={(
            <div>
              <h2>Welcome back</h2>

              <Form error={!!error}>
                <Form.Field>
                  <Input
                    name="email"
                    placeholder="you@domain.com"
                    icon="mail outline"
                    iconPosition="left"
                    size="big"
                    onChange={this.handleInputChange}
                    value={this.state.email}
                  />
                </Form.Field>

                <Message error content={error} />

                <Button
                  onClick={this.handleSubmit}
                  size="big"
                  primary
                  fluid
                >Send Magic Login Link</Button>
              </Form>
            </div>
          )}
        />
      </Segment>
    );
  }
}

export default LoginForm;
