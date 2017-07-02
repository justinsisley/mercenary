import React from 'react';
import { Segment, Container, Grid } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../PublicNav';
import LoginForm from '../../containers/LoginForm';

function PublicHomeHero() {
  return (
    <Segment className={css(styles.hero)} textAlign="center" inverted vertical>
      <PublicNav />

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

export default PublicHomeHero;
