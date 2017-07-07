import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Button, Header } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../PublicNav';

function HomeHero() {
  return (
    <Segment
      className={css(styles.hero)}
      textAlign="center"
      inverted
      vertical
    >
      <PublicNav />

      <Container text>
        <Header as="h1" inverted>Better Contract Management</Header>

        <h2>Do whatever you want when you want to.</h2>

        <Button
          size="huge"
          as={Link}
          to="/features"
          primary
        >Learn More</Button>
      </Container>
    </Segment>
  );
}

export default HomeHero;
