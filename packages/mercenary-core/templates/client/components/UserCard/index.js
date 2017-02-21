import React from 'react';
import { Card, Image, Icon } from 'semantic-ui-react';
import { css } from 'aphrodite';
import styles from './styles';

const imagePrefix = 'https://unsplash.it/650/?blur&image=15';

function UserCard(props) {
  return (
    <Card>
      <Image
        className={css(styles.card_image)}
        src={`${imagePrefix}${props.user.id}`}
      />

      <Card.Content>
        <Card.Header>
          {props.user.name}
        </Card.Header>

        <Card.Meta>
          @{props.user.username}
        </Card.Meta>

        <Card.Description>
          {props.user.phone}
        </Card.Description>
      </Card.Content>

      <Card.Content>
        <a
          href={`http://${props.user.website}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Icon name="user" />
          {props.user.website}
        </a>
      </Card.Content>
    </Card>
  );
}

UserCard.defaultProps = {
  user: {},
};

UserCard.propTypes = {
  user: React.PropTypes.shape(),
};

export default UserCard;
