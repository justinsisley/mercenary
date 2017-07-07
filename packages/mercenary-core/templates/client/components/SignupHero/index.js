import React from 'react';
import { Segment } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../PublicNav';
import SignupForm from '../../containers/SignupForm';

function SignupHero() {
  return (
    <Segment
      className={css(styles.hero)}
      textAlign="center"
      vertical
    >
      <PublicNav dark />

      <SignupForm />
    </Segment>
  );
}

export default SignupHero;
