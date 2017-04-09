import React from 'react';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import { css } from 'aphrodite';
import styles from './styles';
import LoginForm from '../../containers/LoginForm';

function LoginScreen() {
  return (
    <DocumentTitle title="Mercenary | Login">
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

export default LoginScreen;
