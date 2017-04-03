import React from 'react';
import { css } from 'aphrodite';
import styles from './styles';
import Menu from '../Menu';

function Layout(props) {
  return (
    <div>
      <Menu />

      <div className={css(styles.content)}>
        {props.children}
      </div>
    </div>
  );
}

Layout.propTypes = {
  children: React.PropTypes.node,
};

Layout.defaultProps = {
  children: null,
};

export default Layout;
