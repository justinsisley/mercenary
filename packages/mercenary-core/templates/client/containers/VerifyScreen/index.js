import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verify } from '../../store/userAccount/actions';
import VerifyScreen from '../../screens/VerifyScreen';

// Map application state to component props
function mapStateToProps(state) {
  return {
    users: state.entities.users,
    todos: state.entities.todos,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ verifyAccount: verify }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyScreen);
