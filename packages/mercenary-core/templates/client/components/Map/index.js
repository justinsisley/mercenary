import React from 'react';
import propTypes from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';

function Map(props) {
  const { height, ...rest } = props;

  const markers = props.markers.map((marker) => {
    return (
      <Marker
        key={`map-marker-${marker.lat}-${marker.lng}`}
        // eslint-disable-next-line
        position={new google.maps.LatLng(marker.lat, marker.lng)}
        defaultAnimation={2}
      />
    );
  });

  const Component = withGoogleMap(() => {
    return <GoogleMap {...rest}>{markers}</GoogleMap>;
  });

  return (
    <Component
      containerElement={<div style={{ height }} />}
      mapElement={<div style={{ height }} />}
    />
  );
}

Map.propTypes = {
  markers: propTypes.arrayOf(propTypes.shape()),
  height: propTypes.number,
};

Map.defaultProps = {
  markers: [],
  height: 200,
};

export default Map;
