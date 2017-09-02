import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUser } from '../../store/users/actions';
import UserDetailScreen from '../../screens/UserDetail';

// Map application state to component props
function mapStateToProps(state) {
  return {
    users: state.users,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUser,
  }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UserDetailScreen);
