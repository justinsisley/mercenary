import React from 'react';
import { Segment, Container, Header } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../PublicNav';

function PricingHero() {
  return (
    <Segment
      className={css(styles.hero)}
      textAlign="center"
      inverted
      vertical
    >
      <PublicNav />

      <Container text>
        <Header as="h1" inverted>Simple Pricing for Companies of Every Size</Header>
      </Container>
    </Segment>
  );
}

export default PricingHero;
