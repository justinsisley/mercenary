import React from 'react';
import propTypes from 'prop-types';
import classnames from 'classnames';
import styles from './styles';

function Button(props) {
  return (
    <button
      className={classnames(styles.button, props.color)}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}

Button.propTypes = {
  children: propTypes.node,
  onClick: propTypes.func,
  color: propTypes.oneOf(['blue', 'green']),
};

Button.defaultProps = {
  children: null,
  onClick() {},
  color: null,
};

export default Button;
