import React from 'react';
import { Menu } from 'semantic-ui-react';
import { css } from 'aphrodite';
import { navItems, sortByPosition } from '../../routes';
import styles from './styles';

class NavMenu extends React.Component {
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

    const menuItems = navItems.sort(sortByPosition).map((navItem) => {
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
        <Menu.Item header>Mercenary</Menu.Item>

        <Menu.Item>
          <Menu.Menu>{menuItems}</Menu.Menu>
        </Menu.Item>
      </Menu>
    );
  }
}

export default NavMenu;
