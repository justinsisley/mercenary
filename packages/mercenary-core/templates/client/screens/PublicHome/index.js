import React from 'react';
import DocumentTitle from 'react-document-title';

class PublicHomeScreen extends React.Component {
  static propTypes = {}

  static defaultProps = {}

  render() {
    return (
      <DocumentTitle title="Mercenary">
        <h1>Mercenary</h1>
      </DocumentTitle>
    );
  }
}

export default PublicHomeScreen;
