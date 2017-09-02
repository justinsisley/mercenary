import React from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react';
import PublicNav from '../PublicNav';
import LoginForm from '../../containers/LoginForm';
import styles from './styles';

function LoginHero() {
  return (
    <Segment
      className={styles.hero}
      textAlign="center"
      vertical
    >
      <PublicNav dark />

      <Container text>
        <Grid centered columns={12}>
          <Grid.Column width={7}>
            <LoginForm />
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
}

export default LoginHero;
