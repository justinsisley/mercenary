import React from 'react';
import DocumentTitle from 'react-document-title';
import { Grid } from 'semantic-ui-react';
import UserCard from '../UserCard';
import UserForm from '../UserForm';

function HomeScreen(props) {
  let userCard = null;

  if (props.user.id) {
    userCard = <UserCard {...props} />;
  }

  return (
    <DocumentTitle title="Opsurance | Home">
      <Grid centered columns={6}>
        <Grid.Column>
          <UserForm {...props} />

          {userCard}
        </Grid.Column>
      </Grid>
    </DocumentTitle>
  );
}

HomeScreen.propTypes = {
  user: React.PropTypes.shape(),
};

export default HomeScreen;
