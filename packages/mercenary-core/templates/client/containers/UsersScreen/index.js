import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '../../store/users/actions';
import UsersScreen from '../../screens/UsersScreen';

// Map application state to component props
function mapStateToProps(state) {
  return {
    users: state.entities.users,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUsers }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);
