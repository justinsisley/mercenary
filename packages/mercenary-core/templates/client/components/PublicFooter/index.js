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
            <Header as="h4" inverted>About</Header>

            <List inverted link>
              <List.Item as={Link} to="/">Sitemap</List.Item>
              <List.Item as={Link} to="/">Contact Us</List.Item>
              <List.Item as={Link} to="/">Religious Ceremonies</List.Item>
              <List.Item as={Link} to="/">Gazebo Plans</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width="3">
            <Header as="h4" inverted>Services</Header>

            <List inverted link>
              <List.Item as={Link} to="/">Banana Pre-Order</List.Item>
              <List.Item as={Link} to="/">DNA FAQ</List.Item>
              <List.Item as={Link} to="/">How To Access</List.Item>
              <List.Item as={Link} to="/">Favorite X-Men</List.Item>
            </List>
          </Grid.Column>

          <Grid.Column width="7">
            <Header as="h4" inverted>Mercenary</Header>

            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
          </Grid.Column>
        </Grid>
      </Container>
    </Segment>
  );
}

export default PublicFooter;
