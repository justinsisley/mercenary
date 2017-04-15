import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import { Segment, Button, Form, Message, Checkbox } from 'semantic-ui-react';
import validator from 'validator';

class SignupForm extends React.Component {
  state = {
    email: '',
    emailError: false,

    name: '',
    nameError: false,

    agreeTerms: false,
    agreeTermsError: false,
  }

  handleSubmit = (e) => {
    e.preventDefault();

    const { email, name, agreeTerms } = this.state;
    const isEmail = validator.isEmail(email);

    if (!email || !isEmail) {
      this.setState({ emailError: true });
      return;
    }

    if (!name) {
      this.setState({ nameError: true });
      return;
    }

    if (!agreeTerms) {
      this.setState({ agreeTermsError: true });
      return;
    }

    this.setState({
      emailError: false,
      nameError: false,
      agreeTermsError: false,
    });

    this.props.register({ email, name });
  }

  render() {
    if (this.props.token) {
      return <Redirect to="/" />;
    }

    const { emailError, nameError, agreeTermsError } = this.state;
    const hasError = !!this.props.error || emailError || nameError || agreeTermsError;

    let errorMessage = 'Invalid email address';
    if (nameError) {
      errorMessage = 'Invalid name';
    }
    if (agreeTermsError) {
      errorMessage = 'You must agree to the Terms and Conditions';
    }

    return (
      <Segment>
        <h2>Sign Up</h2>

        <Form error={hasError}>
          <Form.Field>
            <label htmlFor="email">Email Address</label>

            <input
              id="email"
              placeholder="you@agency.com"
              onChange={(e) => {
                this.setState({
                  email: e.target.value,
                  emailError: false,
                });
              }}
            />
          </Form.Field>

          <Form.Field>
            <label htmlFor="name">Name</label>

            <input
              id="name"
              placeholder="Full name"
              onChange={(e) => {
                this.setState({
                  name: e.target.value,
                  nameError: false,
                });
              }}
            />
          </Form.Field>

          <Form.Field>
            <Checkbox
              label="I agree to the Terms and Conditions"
              onChange={(e, { checked }) => {
                this.setState({
                  agreeTerms: checked,
                });
              }}
            />
          </Form.Field>

          <Message error content={errorMessage} />

          <Button onClick={this.handleSubmit}>Continue</Button>
        </Form>
      </Segment>
    );
  }
}

SignupForm.propTypes = {
  error: propTypes.shape(),
  register: propTypes.func,
  token: propTypes.string,
};

SignupForm.defaultProps = {
  error: null,
  register: () => {},
  token: '',
};

export default SignupForm;
