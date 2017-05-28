import React from 'react';
import propTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import LoginForm from '../../containers/LoginForm';

function LoginScreen(props) {
  if (props.token) {
    return <Redirect to="/" />;
  }

  return (
    <DocumentTitle title="Login">
      <Grid centered columns={12}>
        <Grid.Column width={3}>
          <div className={css(styles.form)}>
            <LoginForm />
          </div>
        </Grid.Column>
      </Grid>
    </DocumentTitle>
  );
}

LoginScreen.propTypes = {
  token: propTypes.string,
};

LoginScreen.defaultProps = {
  token: '',
};

export default LoginScreen;
