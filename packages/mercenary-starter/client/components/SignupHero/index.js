import React from 'react';
import { Segment } from 'semantic-ui-react';
import PublicNav from '../PublicNav';
import SignupForm from '../../containers/SignupForm';
import styles from './styles';

function SignupHero() {
  return (
    <Segment
      className={styles.hero}
      textAlign="center"
      vertical
    >
      <PublicNav dark />

      <SignupForm />
    </Segment>
  );
}

export default SignupHero;
