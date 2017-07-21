import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '../../store/users/actions';
import { getFilteredUsers } from '../../store/users/selectors';
import { setUserFilter } from '../../store/ui/actions';
import UsersScreen from '../../screens/Users';

// Map application state to component props
function mapStateToProps(state) {
  return {
    users: getFilteredUsers(state),
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUsers,
    setUserFilter,
  }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(UsersScreen);
