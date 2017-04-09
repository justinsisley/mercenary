import React from 'react';
import propTypes from 'prop-types';
import { css } from 'aphrodite';
import styles from './styles';
import NavMenu from '../NavMenu';

function AppLayout(props) {
  return (
    <div>
      <NavMenu />

      <div className={css(styles.content)}>
        {props.children}
      </div>
    </div>
  );
}

AppLayout.propTypes = {
  children: propTypes.node,
};

AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
