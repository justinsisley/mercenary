import React from 'react';
import { Dropdown, Icon, Input, Menu as SUIMenu } from 'semantic-ui-react';
import { css } from 'aphrodite';
import styles from './styles';

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

    return (
      <SUIMenu vertical className={css(styles.menu)}>
        <SUIMenu.Item header>Mercenary</SUIMenu.Item>

        <SUIMenu.Item>
          <Input placeholder="Search..." />
        </SUIMenu.Item>

        <SUIMenu.Item>
          Dashboard

          <SUIMenu.Menu>
            <SUIMenu.Item
              name="/"
              active={activeItem === '/'}
              onClick={this.handleItemClick}
            >
              Orders
            </SUIMenu.Item>

            <SUIMenu.Item
              name="/users"
              active={activeItem === '/users'}
              onClick={this.handleItemClick}
            >
              Users
            </SUIMenu.Item>

            <SUIMenu.Item
              name="/todos"
              active={activeItem === '/todos'}
              onClick={this.handleItemClick}
            >
              Todos
            </SUIMenu.Item>
          </SUIMenu.Menu>
        </SUIMenu.Item>

        <SUIMenu.Item
          name="browse"
          active={activeItem === 'browse'}
          onClick={this.handleItemClick}
        >
          <Icon name="grid layout" />
          Browse
        </SUIMenu.Item>

        <SUIMenu.Item
          name="messages"
          active={activeItem === 'messages'}
          onClick={this.handleItemClick}
        >
          Messages
        </SUIMenu.Item>

        <Dropdown item text="More">
          <Dropdown.Menu>
            <Dropdown.Item icon="edit" text="Edit Profile" />
            <Dropdown.Item icon="globe" text="Choose Language" />
            <Dropdown.Item icon="settings" text="Account Settings" />
          </Dropdown.Menu>
        </Dropdown>
      </SUIMenu>
    );
  }
}

export default Menu;
