import React from 'react';
import propTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { Segment, Container, Button, Header } from 'semantic-ui-react';
import PublicNav from '../PublicNav';
import Conditional from '../Conditional';
import styles from './styles';

function PublicHero(props) {
  return (
    <Segment
      className={styles.hero}
      textAlign="center"
      inverted
      vertical
    >
      <PublicNav />

      <Container text>
        <Header as="h1" inverted>{props.title}</Header>

        <Conditional
          if={props.subTitle}
          then={<h2>{props.subTitle}</h2>}
        />

        <Conditional
          if={props.buttonText}
          then={(
            <Button
              size="huge"
              as={Link}
              to={props.buttonLink}
              primary
            >{props.buttonText}
            </Button>
          )}
        />
      </Container>
    </Segment>
  );
}

PublicHero.propTypes = {
  title: propTypes.string,
  subTitle: propTypes.string,
  buttonText: propTypes.string,
  buttonLink: propTypes.string,
};

PublicHero.defaultProps = {
  title: '',
  subTitle: '',
  buttonText: '',
  buttonLink: '',
};

export default PublicHero;
