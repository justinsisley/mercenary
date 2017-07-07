import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Header, Button, Image } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';

function PricingContent() {
  return (
    <div>
      <Segment className={css(styles.stripe)} vertical>
        <Grid
          verticalAlign="middle"
          container
          stackable
        >
          <Grid.Row>
            <Grid.Column width="8">
              <Header as="h3">This product is the best.</Header>

              <p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut.</p>

              <Button
                size="big"
                as={Link}
                to="/signup"
                primary
                basic
              >Start a Free Trial</Button>
            </Grid.Column>

            <Grid.Column width="6" floated="right">
              <Image
                src="https://semantic-ui.com/examples/assets/images/wireframe/white-image.png"
                shape="rounded"
                size="large"
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width="6" floated="left">
              <Image
                src="https://semantic-ui.com/examples/assets/images/wireframe/white-image.png"
                shape="rounded"
                size="large"
              />
            </Grid.Column>

            <Grid.Column width="8">
              <Header as="h3">This product is the best.</Header>

              <p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut.</p>

              <Button
                size="big"
                as={Link}
                to="/signup"
                primary
                basic
              >Start a Free Trial</Button>
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column width="8">
              <Header as="h3">This product is the best.</Header>

              <p>Gumbo beet greens corn soko endive gumbo gourd. Parsley shallot courgette tatsoi pea sprouts fava bean collard greens dandelion okra wakame tomato. Dandelion cucumber earthnut pea peanut.</p>

              <Button
                size="big"
                as={Link}
                to="/signup"
                primary
                basic
              >Start a Free Trial</Button>
            </Grid.Column>

            <Grid.Column width="6" floated="right">
              <Image
                src="https://semantic-ui.com/examples/assets/images/wireframe/white-image.png"
                shape="rounded"
                size="large"
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    </div>
  );
}

export default PricingContent;
