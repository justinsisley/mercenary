import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Container, Grid, Header, List } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';

function PublicFooter() {
  return (
    <Segment className={css(styles.footer)} vertical inverted>
      <Container>
        <Grid stackable inverted divided>
          <Grid.Column width="3">
            <Header as="h4" inverted>Resources</Header>

            <List inverted link>
              <List.Item as={Link} to="/features">Features</List.Item>
              <List.Item as={Link} to="/pricing">Pricing</List.Item>
              <List.Item as={Link} to="/privacy">Privacy and Terms</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width="3">
            <Header as="h4" inverted>Solutions</Header>

            <List inverted link>
              <List.Item as={Link} to="/features">For Developers</List.Item>
              <List.Item as={Link} to="/features">For Designers</List.Item>
              <List.Item as={Link} to="/features">For Investors</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width="7">
            <Header as="h4" inverted>Mercenary</Header>

            <p>Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress.</p>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
}

export default PublicFooter;
