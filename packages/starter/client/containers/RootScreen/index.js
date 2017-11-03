import { connect } from 'react-redux';
import Root from '../../screens/Root';

// Map application state to component props
function mapStateToProps(state) {
  return {
    token: state.session.token,
  };
}

// Connect component to store
export default connect(mapStateToProps)(Root);
