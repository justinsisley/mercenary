import React from 'react';
import propTypes from 'prop-types';
import { Segment, Container, Header, Button, Icon, Visibility } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';
import PublicNav from '../../containers/PublicNav';

function PublicHomeHero(props) {
  return (
    <Visibility
      once={false}
      onOnScreen={props.hidePublicStickyNav}
      onOffScreen={props.showPublicStickyNav}
    >
      <Segment className={css(styles.hero)} textAlign="center" inverted vertical>
        <PublicNav />

        <Container text>
          <Header as="h1" inverted>Mercenary</Header>

          <h2>Do whatever you want when you want to.</h2>

          <Button size="huge" primary>
            Get Started <Icon name="arrow right" />
          </Button>
        </Container>
      </Segment>
    </Visibility>
  );
}

PublicHomeHero.propTypes = {
  hidePublicStickyNav: propTypes.func,
  showPublicStickyNav: propTypes.func,
};

PublicHomeHero.defaultProps = {
  hidePublicStickyNav() {},
  showPublicStickyNav() {},
};

export default PublicHomeHero;
