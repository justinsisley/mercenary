import React from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';

const navItems = [
  { path: '/', label: 'Dashboard' },
  { path: '/users', label: 'Users' },
  { path: '/logout', label: 'Log Out' },
];

function NavMenu(props) {
  const { pathname } = props.location;
  const { push } = props.history;

  const menuItems = navItems.map((navItem) => {
    return (
      <Menu.Item
        key={navItem.path}
        name={navItem.path}
        active={pathname === navItem.path}
        onClick={(e, { name }) => { push(name); }}
      >{navItem.label}</Menu.Item>
    );
  });

  return (
    <Menu className={css(styles.menu)} vertical inverted>
      <Menu.Item header>Tracto</Menu.Item>

      <Menu.Item>
        <Menu.Menu>
          {menuItems}
        </Menu.Menu>
      </Menu.Item>
    </Menu>
  );
}

NavMenu.propTypes = {
  location: propTypes.shape(),
  history: propTypes.shape(),
};

NavMenu.defaultProps = {
  location: {},
  history: {},
};

export default withRouter(NavMenu);
