import React from 'react';
import { Link } from 'react-router-dom';
// import propTypes from 'prop-types';
// import classnames from 'classnames';
// import { css } from 'aphrodite-jss';
// import styles from './styles';

function PublicHomeHero() {
  return (
    <div className="ui inverted vertical masthead center aligned segment">
      <div className="ui container">
        <div className="ui large secondary inverted pointing menu">
          <Link className="active item" to="/">Home</Link>
          <Link className="item" to="/work">Work</Link>
          <Link className="item" to="/company">Company</Link>
          <Link className="item" to="/careers">Careers</Link>

          <div className="right item">
            <Link className="ui inverted button" to="/login">Log in</Link>
            <Link className="ui inverted button" to="/signup">Sign Up</Link>
          </div>
        </div>
      </div>

      <div className="ui text container">
        <h1 className="ui inverted header">
          Mercenary
        </h1>

        <h2>Do whatever you want when you want to.</h2>

        <div className="ui huge primary button">
          Get Started <i className="right arrow icon" />
        </div>
      </div>
    </div>
  );
}

PublicHomeHero.propTypes = {};

PublicHomeHero.defaultProps = {};

export default PublicHomeHero;
