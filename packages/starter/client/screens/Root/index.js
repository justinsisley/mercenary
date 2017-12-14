import React from 'react';
import propTypes from 'prop-types';
import loadable from 'loadable-components';
import AppLayout from '../../components/AppLayout';

function DashboardScreen(props) {
  const AsyncComponent = loadable(() => import('../../containers/DashboardScreen'));

  return (
    <AppLayout>
      <AsyncComponent {...props} />
    </AppLayout>
  );
}

function HomeScreen(props) {
  const AsyncComponent = loadable(() => import('../Home'));
  return <AsyncComponent {...props} />;
}

function Root(props) {
  if (props.token) {
    return <DashboardScreen {...props} />;
  }

  return <HomeScreen {...props} />;
}

Root.propTypes = {
  token: propTypes.string,
};

Root.defaultProps = {
  token: '',
};

export default Root;
