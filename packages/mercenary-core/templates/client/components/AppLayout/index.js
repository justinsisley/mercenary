import React from 'react';
import propTypes from 'prop-types';
import { css } from 'aphrodite-jss';
import styles from './styles';
import AppNav from '../AppNav';

function AppLayout(props) {
  return (
    <div>
      <AppNav />

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
