import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';

function PublicNav(props, context) {
  const { pathname } = context.router.route.location;

  return (
    <Container className={css(styles.nav)} >
      <Menu size="large" secondary inverted pointing>
        <Menu.Item as={Link} to="/" active={pathname === '/'}>Home</Menu.Item>
        <Menu.Item as={Link} to="/work" active={pathname === '/work'}>Work</Menu.Item>
        <Menu.Item as={Link} to="/company" active={pathname === '/company'}>Company</Menu.Item>
        <Menu.Item as={Link} to="/careers" active={pathname === '/careers'}>Careers</Menu.Item>

        <Menu.Item position="right">
          <Button as={Link} to="/login" inverted>Log In</Button>
          <Button as={Link} to="/signup" inverted>Sign Up</Button>
        </Menu.Item>
      </Menu>
    </Container>
  );
}

PublicNav.contextTypes = {
  router: propTypes.shape({
    route: propTypes.shape({
      location: propTypes.shape({
        pathname: propTypes.string,
      }),
    }),
  }).isRequired,
};

export default PublicNav;
