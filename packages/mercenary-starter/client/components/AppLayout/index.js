import React from 'react';
import propTypes from 'prop-types';
import AppNav from '../AppNav';
import styles from './styles';

function AppLayout(props) {
  return (
    <div>
      <AppNav />

      <div className={styles.content}>
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
