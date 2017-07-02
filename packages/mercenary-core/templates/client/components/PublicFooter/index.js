import React from 'react';
// import propTypes from 'prop-types';
// import classnames from 'classnames';
// import { css } from 'aphrodite-jss';
// import styles from './styles';

function PublicFooter() {
  return (
    <div className="ui inverted vertical footer segment">
      <div className="ui container">
        <div className="ui stackable inverted divided equal height stackable grid">
          <div className="three wide column">
            <h4 className="ui inverted header">About</h4>

            <div className="ui inverted link list">
              <a href="/" className="item">Sitemap</a>
              <a href="/" className="item">Contact Us</a>
              <a href="/" className="item">Religious Ceremonies</a>
              <a href="/" className="item">Gazebo Plans</a>
            </div>
          </div>

          <div className="three wide column">
            <h4 className="ui inverted header">Services</h4>

            <div className="ui inverted link list">
              <a href="/" className="item">Banana Pre-Order</a>
              <a href="/" className="item">DNA FAQ</a>
              <a href="/" className="item">How To Access</a>
              <a href="/" className="item">Favorite X-Men</a>
            </div>
          </div>

          <div className="seven wide column">
            <h4 className="ui inverted header">Mercenary</h4>

            <p>Extra space for a call to action inside the footer that could help re-engage users.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

PublicFooter.propTypes = {};

PublicFooter.defaultProps = {};

export default PublicFooter;
