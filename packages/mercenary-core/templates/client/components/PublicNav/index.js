import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Container, Menu, Button } from 'semantic-ui-react';
import classnames from 'classnames';
import { css } from 'aphrodite-jss';
import styles from './styles';

const links = [
  { label: 'Home', to: '/' },
  { label: 'Work', to: '/work' },
  { label: 'Company', to: '/company' },
  { label: 'Careers', to: '/careers' },
];

class PublicNav extends React.Component {
  state = {
    visibility: css(styles.hidden),
  }

  componentWillReceiveProps(nextProps) {
    if (
      this.props.showPublicStickyNav === false &&
      nextProps.showPublicStickyNav === true
    ) {
      this.setState({ visibility: 'slideInDown' });
    } else {
      this.setState({ visibility: 'slideOutUp' });
    }
  }

  render() {
    const { pathname } = this.context.router.route.location;

    const menuItems = links.map((link) => {
      return (
        <Menu.Item
          as={Link}
          to="/"
          active={pathname === link.to}
          key={`link-${link.label}-${link.to}`}
        >{link.label}</Menu.Item>
      );
    });

    return (
      <div>
        <Menu
          className={classnames('animated', css(styles.stickyNav), this.state.visibility)}
          size="large"
          fixed="top"
        >
          <Container>
            {menuItems}

            <Menu.Menu position="right">
              <Menu.Item>
                <Button as={Link} to="/login">Log In</Button>
              </Menu.Item>

              <Menu.Item>
                <Button as={Link} to="/signup" primary>Sign Up</Button>
              </Menu.Item>
            </Menu.Menu>
          </Container>
        </Menu>

        <Container className={css(styles.nav)} >
          <Menu size="large" secondary inverted pointing>
            {menuItems}

            <Menu.Item position="right">
              <Button as={Link} to="/login" inverted>Log In</Button>
              <Button as={Link} to="/signup" inverted>Sign Up</Button>
            </Menu.Item>
          </Menu>
        </Container>
      </div>
    );
  }
}

PublicNav.propTypes = {
  showPublicStickyNav: propTypes.bool,
};

PublicNav.defaultProps = {
  showPublicStickyNav: false,
};

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
