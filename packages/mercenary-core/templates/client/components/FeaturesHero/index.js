import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Button, Header } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../PublicNav';

function FeaturesHero() {
  return (
    <Segment
      className={css(styles.hero)}
      textAlign="center"
      inverted
      vertical
    >
      <PublicNav />

      <Container text>
        <Header as="h1" inverted>Managing Contracts Has Never Been Easier</Header>

        <h2>Do whatever you want when you want to.</h2>

        <Button
          size="huge"
          as={Link}
          to="/features#contracts"
          primary
        >Learn More</Button>
      </Container>
    </Segment>
  );
}

export default FeaturesHero;
