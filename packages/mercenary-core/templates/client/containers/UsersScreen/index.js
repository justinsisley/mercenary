import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as users from '../../store/users/actions';
import * as ui from '../../store/ui/actions';
import { getFilteredUsers } from '../../store/users/selectors';
import UsersScreen from '../../screens/Users';

// Map application state to component props
function mapStateToProps(state) {
  return {
    filteredUsers: getFilteredUsers(state),
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers: users.getUsers,
    getUser: users.getUser,
    setUserFilter: ui.setUserFilter,
  }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);
