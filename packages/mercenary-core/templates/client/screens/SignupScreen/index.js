import React from 'react';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import { css } from 'aphrodite';
import styles from './styles';
import SignupForm from '../../containers/SignupForm';

function SignupScreen() {
  return (
    <DocumentTitle title="Mercenary | Login">
      <Grid centered columns={12}>
        <Grid.Column width={3}>
          <div className={css(styles.form)}>
            <SignupForm />
          </div>
        </Grid.Column>
      </Grid>
    </DocumentTitle>
  );
}

export default SignupScreen;
