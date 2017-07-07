import React from 'react';
import propTypes from 'prop-types';
import { asyncComponent } from 'react-async-component';
import AppLayout from '../../components/AppLayout';

const loadAsync = resolve => asyncComponent({ resolve });

function DashboardScreen(props) {
  const AsyncComponent = loadAsync(() => import('../../containers/DashboardScreen'));

  return (
    <AppLayout>
      <AsyncComponent {...props} />
    </AppLayout>
  );
}

function HomeScreen(props) {
  const AsyncComponent = loadAsync(() => import('../Home'));
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
