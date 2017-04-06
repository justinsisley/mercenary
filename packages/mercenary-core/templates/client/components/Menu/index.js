import React from 'react';
import { Menu as SUIMenu } from 'semantic-ui-react';
import { css } from 'aphrodite';
import styles from './styles';

const navItems = [
  {
    position: 0,
    label: 'Orders',
    path: '/',
  },
  {
    position: 1,
    label: 'Users',
    path: '/users',
  },
  {
    position: 2,
    label: 'Todos',
    path: '/todos',
  },
];

class Menu extends React.Component {
  static contextTypes = {
    router: React.PropTypes.shape().isRequired,
  }

  state = {
    activeItem: this.context.router.route.location.pathname,
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });

    this.context.router.history.push(name);
  }

  render() {
    const { activeItem } = this.state;

    const menuItems = navItems.sort((a, b) => {
      const positionA = a.position;
      const positionB = b.position;

      if (positionA > positionB) {
        return 1;
      }
      if (positionA < positionB) {
        return -1;
      }

      return 0;
    }).map((navItem) => {
      return (
        <SUIMenu.Item
          key={navItem.path}
          name={navItem.path}
          active={activeItem === navItem.path}
          onClick={this.handleItemClick}
        >
          {navItem.label}
        </SUIMenu.Item>
      );
    });

    return (
      <SUIMenu vertical className={css(styles.menu)}>
        <SUIMenu.Item header>Mercenary</SUIMenu.Item>

        <SUIMenu.Item>
          <SUIMenu.Menu>{menuItems}</SUIMenu.Menu>
        </SUIMenu.Item>
      </SUIMenu>
    );
  }
}

export default Menu;
