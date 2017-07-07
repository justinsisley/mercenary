import React from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../PublicNav';
import LoginForm from '../../containers/LoginForm';

function LoginHero() {
  return (
    <Segment
      className={css(styles.hero)}
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
