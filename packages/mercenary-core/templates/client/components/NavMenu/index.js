import React from 'react';
import propTypes from 'prop-types';
import { Menu } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';

// Sort an array of objects by their "position" property
function sortByPosition(a, b) {
  const positionA = a.position;
  const positionB = b.position;

  if (positionA > positionB) {
    return 1;
  }
  if (positionA < positionB) {
    return -1;
  }

  return 0;
}

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
        position: 0,
        path: '/',
        label: 'Dashboard',
      },
      {
        position: 1,
        path: '/logout',
        label: 'Log Out',
      },
    ],
    activeItem: this.context.router.route.location.pathname,
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

    this.context.router.history.push(name);
  }

  render() {
    const { activeItem } = this.state;

    const menuItems = this.state.navItems.sort(sortByPosition).map((navItem) => {
      return (
        <Menu.Item
          key={navItem.path}
          name={navItem.path}
          active={activeItem === navItem.path}
          onClick={this.handleItemClick}
        >
          {navItem.label}
        </Menu.Item>
      );
    });

    return (
      <Menu vertical className={css(styles.menu)}>
        <Menu.Item header>
          Mercenary
        </Menu.Item>

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
