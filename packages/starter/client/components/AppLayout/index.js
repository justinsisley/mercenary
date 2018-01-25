import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import AppNav from '../AppNav';
import styles from './styles';

function AppLayout(props) {
  return (
    <Fragment>
      <AppNav />

      <div className={styles.content}>
        {props.children}
      </div>
    </Fragment>
  );
}

AppLayout.propTypes = {
  children: propTypes.node,
};

AppLayout.defaultProps = {
  children: null,
};

export default AppLayout;
