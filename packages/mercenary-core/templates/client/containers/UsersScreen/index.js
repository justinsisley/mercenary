import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as users from '../../store/users/actions';
import UsersScreen from '../../screens/Users';

// Map application state to component props
function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...users }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);
