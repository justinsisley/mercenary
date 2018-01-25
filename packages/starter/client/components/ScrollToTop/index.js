import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return <Fragment>{this.props.children}</Fragment>;
  }
}

ScrollToTop.propTypes = {
  location: propTypes.shape({
    pathname: propTypes.string,
  }),
  children: propTypes.node,
};

ScrollToTop.defaultProps = {
  location: {},
  children: null,
};

export default withRouter(ScrollToTop);
