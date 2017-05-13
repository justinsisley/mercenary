import React from 'react';
import DocumentTitle from 'react-document-title';
import { Grid, Segment, Button, List } from 'semantic-ui-react';
import { locations, Game } from '../../utils/game';

class GameScreen extends React.Component {
  state = {
    game: new Game(),
  }

  render() {
    const { days, location, getProducts, player } = this.state.game;

    const listItems = getProducts().map((product) => {
      return (
        <List.Item key={product.name}>
          <List.Content>
            <List.Content floated="right">
              <Button size="mini">Buy</Button>
              <Button size="mini">Sell</Button>
            </List.Content>

            <List.Header>{product.name}</List.Header>

            <List.Description>${product.price.toLocaleString()}</List.Description>
          </List.Content>
        </List.Item>
      );
    });

    return (
      <DocumentTitle title="Game">
        <Grid centered columns={2}>
          <Grid.Column>
            <Segment>
              <h3>Stats</h3>

              <List divided verticalAlign="middle">
                <List.Item>
                  Day: {days.current} of {days.total}
                </List.Item>

                <List.Item>
                  Storage: using {player.inventory.totalItems} of {player.inventory.maxItems} spaces
                </List.Item>

                <List.Item>
                  <List.Content floated="right">
                    <Button size="mini">Travel</Button>
                  </List.Content>

                  Location: {locations[location]}
                </List.Item>
              </List>

            </Segment>

            <Segment>
              <h3>Products</h3>

              <List divided verticalAlign="middle">
                {listItems}
              </List>
            </Segment>
          </Grid.Column>
        </Grid>
      </DocumentTitle>
    );
  }
}


export default GameScreen;
