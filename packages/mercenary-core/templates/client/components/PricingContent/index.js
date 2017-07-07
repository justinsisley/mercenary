import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Header, Image, Container, Divider, Button } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import PriceCard from '../PriceCard';
import styles from './styles';

function PricingContent() {
  return (
    <div className={css(styles.pricingContent)}>
      <Segment className={css(styles.stripe)} vertical>
        <Grid
          container
          stackable
          relaxed
          centered
        >
          <Grid.Row>
            <Grid.Column width={5}>
              <PriceCard
                title="Startup"
                price="25"
                keyFeature="10 Contracts"
                description="Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed."
                buttonText="Get Started"
                link={'/signup#startup'}
              />
            </Grid.Column>

            <Grid.Column width={5}>
              <PriceCard
                title="Small Business"
                price="50"
                keyFeature="50 Contracts"
                description="Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed."
                buttonText="Get Started"
                link={'/signup#smb'}
                highlight
              />
            </Grid.Column>

            <Grid.Column width={5}>
              <PriceCard
                title="Enterprise"
                price="100"
                keyFeature="Unlimited Contracts"
                description="Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed."
                buttonText="Get Started"
                link={'/signup#enterprise'}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment className={css(styles.stripe, styles.quote)} vertical>
        <Grid
          celled="internally"
          columns="equal"
          stackable
        >
          <Grid.Row textAlign="center">
            <Grid.Column>
              <h3>&#34;Mercenary is a game changer for our team!&#34;</h3>

              <p>
                <Image src="https://semantic-ui.com/images/avatar/large/elliot.jpg" avatar />
                &nbsp;
                <b>Billy Barou</b>, Director of Sales, Acme Toys
              </p>
            </Grid.Column>

            <Grid.Column>
              <h3>&#34;We&rsquo;re used to paying so much more for this.&#34;</h3>

              <p>
                <Image src="https://semantic-ui.com/images/avatar/large/elliot.jpg" avatar />
                &nbsp;
                <b>Billy Barou</b>, Director of Sales, Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment className={css(styles.stripe)} vertical>
        <Container text>
          <Header as="h3">No more mistakes or forgotten dates</Header>

          <p>Celery quandong swiss chard chicory earthnut pea potato. Salsify taro catsear garlic gram celery bitterleaf wattle seed collard greens nori. Grape wattle seed kombu beetroot horseradish carrot squash brussels sprout.</p>

          <Button
            size="large"
            as={Link}
            to="/features"
            primary
            basic
          >Learn More</Button>

          <Divider as="header" horizontal>
            <h4><Link to="/features">See More Features</Link></h4>
          </Divider>

          <Header as="h3">Always accurate and up-to-date</Header>

          <p>Soko radicchio bunya nuts gram dulse silver beet parsnip napa cabbage lotus root sea lettuce brussels sprout cabbage. Catsear cauliflower garbanzo yarrow salsify chicory garlic bell pepper napa cabbage.</p>

          <Button
            size="large"
            as={Link}
            to="/signup"
            primary
            basic
          >Start a Free Trial</Button>
        </Container>
      </Segment>
    </div>
  );
}

export default PricingContent;
