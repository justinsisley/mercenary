import React from 'react';
import { Link } from 'react-router-dom';
import { Segment, Grid, Header, Image, Button, Container, Divider } from 'semantic-ui-react';
import { css } from 'aphrodite-jss';
import styles from './styles';

function PublicHomeContent() {
  return (
    <div>
      <Segment className={css(styles.stripe)} vertical>
        <Grid container stackable verticalAlign="middle">
          <Grid.Row>
            <Grid.Column width="8">
              <Header as="h3">We Help Companies and Companions</Header>

              <p>We can give your company superpowers to do things that they never thought possible. Let us delight your customers and empower your needs...through pure data analytics.</p>

              <Header as="h3">We Make Bananas That Can Dance</Header>

              <p>Yes that&lsquo;s right, you thought it was the stuff of dreams, but even bananas can be bioengineered.</p>
            </Grid.Column>

            <Grid.Column width="6" floated="right">
              <Image
                src="https://semantic-ui.com/examples/assets/images/wireframe/white-image.png"
                shape="rounded"
                size="large"
                bordered
              />
            </Grid.Column>
          </Grid.Row>

          <Grid.Row>
            <Grid.Column textAlign="center">
              <Button size="huge" as={Link} to="/">Check Them Out</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment className={css(styles.stripe, styles.quote)} vertical>
        <Grid stackable celled="internally" columns="equal">
          <Grid.Row textAlign="center">
            <Grid.Column>
              <h3>&#34;What a Company&#34;</h3>

              <p>That is what they all say about us</p>
            </Grid.Column>

            <Grid.Column>
              <h3>&#34;I shouldn&lsquo;t have gone with their competitor.&#34;</h3>

              <p>
                <Image src="https://semantic-ui.com/examples/assets/images/avatar/nan.jpg" avatar />
                &nbsp;
                <b>Nan</b> Chief Fun Officer Acme Toys
              </p>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>

      <Segment className={css(styles.stripe)} vertical>
        <Container text>
          <Header as="h3">Breaking The Grid, Grabs Your Attention</Header>

          <p>Instead of focusing on content creation and hard work, we have learned how to master the art of doing nothing by providing massive amounts of whitespace and generic content that can seem massive, monolithic and worth your attention.</p>

          <Button size="large" as={Link} to="/">Read More</Button>

          <Divider as="header" horizontal>
            <h4><Link to="/">Case Studies</Link></h4>
          </Divider>

          <Header as="h3">Did We Tell You About Our Bananas?</Header>

          <p>Yes I know you probably disregarded the earlier boasts as non-sequitur filler content, but its really true. It took years of gene splicing and combinatory DNA research, but our bananas can really dance.</p>

          <Button size="large" as={Link} to="/">I&lsquo;m Still Quite Interested</Button>
        </Container>
      </Segment>
    </div>
  );
}

export default PublicHomeContent;
