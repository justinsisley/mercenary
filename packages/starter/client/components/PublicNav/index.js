import React from 'react';
import propTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';
import Conditional from '../Conditional';
import styles from './styles';

const links = [
  { label: 'Mercenary', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
];

function PublicNav(props) {
  const { pathname } = props.location;

  const menuItems = links.map((link) => {
    return (
      <Menu.Item
        as={Link}
        to={link.to}
        active={pathname === link.to}
        key={`link-${link.label}-${link.to}`}
      >{link.label}
      </Menu.Item>
    );
  });

  return (
    <div>
      <Container className={styles.nav}>
        <Menu
          size="large"
          inverted={!props.dark}
          secondary
          pointing
          borderless
        >
          {menuItems}

          <Menu.Item position="right">
            <Conditional
              if={pathname !== '/login'}
              then={(
                <Button
                  as={Link}
                  to="/login"
                  inverted={!props.dark}
                  basic={props.dark}
                >Log In
                </Button>
              )}
            />

            <Conditional
              if={pathname !== '/signup'}
              then={(
                <Button
                  as={Link}
                  to="/signup"
                  primary
                >Start a Free Trial
                </Button>
              )}
            />
          </Menu.Item>
        </Menu>
      </Container>
    </div>
  );
}

PublicNav.propTypes = {
  location: propTypes.shape({}),
  dark: propTypes.bool,
};

PublicNav.defaultProps = {
  location: {},
  dark: false,
};

export default withRouter(PublicNav);
