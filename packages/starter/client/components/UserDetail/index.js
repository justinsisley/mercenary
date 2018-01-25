import React, { Fragment } from 'react';
import propTypes from 'prop-types';
import { Item } from 'semantic-ui-react';
import Map from '../Map';

function UserDetail(props) {
  const userProps = Object.keys(props.user);

  if (!userProps.length) {
    return null;
  }

  return (
    <Fragment>
      <Item.Group>
        <Item>
          <Item.Image
            size="tiny"
            src="https://react.semantic-ui.com/assets/images/wireframe/image.png"
          />

          <Item.Content>
            <Item.Header>
              {props.user.name}
            </Item.Header>

            <Item.Meta>
              {props.user.email}, @{props.user.username}, {props.user.phone}
            </Item.Meta>

            <Item.Description>
              {props.user.address.street}, {props.user.address.city}, {props.user.address.zipcode}
            </Item.Description>
          </Item.Content>
        </Item>
      </Item.Group>

      <Map
        defaultZoom={3}
        defaultCenter={{
          lat: +props.user.address.geo.lat,
          lng: +props.user.address.geo.lng,
        }}
        markers={[
          {
            lat: +props.user.address.geo.lat,
            lng: +props.user.address.geo.lng,
          },
        ]}
        height={700}
      />
    </Fragment>
  );
}

UserDetail.propTypes = {
  user: propTypes.shape({
    address: propTypes.shape({
      city: propTypes.string,
      geo: propTypes.shape({
        lat: propTypes.string,
        lng: propTypes.string,
      }),
      street: propTypes.string,
      zipcode: propTypes.string,
    }),
    email: propTypes.string,
    name: propTypes.string,
    phone: propTypes.string,
    username: propTypes.string,
  }),
};

UserDetail.defaultProps = {
  user: {},
};

export default UserDetail;
