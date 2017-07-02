import React from 'react';
import propTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';

class NavMenu extends React.Component {
  static contextTypes = {
    router: propTypes.shape({
      route: propTypes.shape({
        location: propTypes.shape({
          pathname: propTypes.string,
        }),
      }),
    }).isRequired,
  }

  state = {
    navItems: [
      {
        path: '/',
        label: 'Dashboard',
      },
      {
        path: '/users',
        label: 'Users',
      },
      {
        path: '/logout',
        label: 'Log Out',
      },
    ],
    pathname: this.context.router.route.location.pathname,
  }

  handleItemClick = (e, { name }) => {
    this.setState({ pathname: name });

    this.context.router.history.push(name);
  }

  render() {
    const { pathname } = this.state;

    const menuItems = this.state.navItems.map((navItem) => {
      return (
        <Menu.Item
          key={navItem.path}
          name={navItem.path}
          active={pathname === navItem.path}
          onClick={this.handleItemClick}
        >{navItem.label}</Menu.Item>
      );
    });

    return (
      <Menu className={css(styles.menu)} vertical inverted>
        <Menu.Item header>Mercenary</Menu.Item>

        <Menu.Item>
          <Menu.Menu>
            {menuItems}
          </Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavMenu;
