import React from 'react';
import { Link } from 'react-router-dom';
import propTypes from 'prop-types';
import { Card, Statistic, Divider, Label, Icon, Button } from 'semantic-ui-react';
import Conditional from '../Conditional';
import styles from './styles';

class PriceCard extends React.Component {
  state = {}

  render() {
    let label = null;

    if (this.props.highlight) {
      label = (
        <Label corner="right" size="huge" color="green">
          <Icon name="star" inverted />
        </Label>
      );
    }

    return (
      <Card className={styles.card} fluid>
        {label}

        <Card.Content header={this.props.title} />

        <Card.Content>
          <Statistic>
            <Statistic.Value>
              <span className={styles.currency}>$</span>
              {this.props.price}
            </Statistic.Value>

            <Statistic.Label>Monthly</Statistic.Label>
          </Statistic>
        </Card.Content>

        <Divider />

        <Card.Content>
          <Card.Meta>
            {this.props.keyFeature}
          </Card.Meta>

          <Conditional
            if={this.props.description}
            then={(
              <Card.Description>
                {this.props.description}
              </Card.Description>
            )}
          />
        </Card.Content>

        <Card.Content>
          <Button
            size="huge"
            as={Link}
            to={this.props.link}
            primary
            basic
          >{this.props.buttonText}
          </Button>
        </Card.Content>
      </Card>
    );
  }
}

PriceCard.propTypes = {
  title: propTypes.string,
  price: propTypes.string,
  keyFeature: propTypes.string,
  description: propTypes.string,
  buttonText: propTypes.string,
  link: propTypes.string,
  highlight: propTypes.bool,
};

PriceCard.defaultProps = {
  title: '',
  price: '',
  keyFeature: '',
  description: '',
  buttonText: '',
  link: '',
  highlight: false,
};

export default PriceCard;
