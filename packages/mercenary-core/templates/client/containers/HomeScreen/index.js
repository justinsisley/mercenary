import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as userActions from '../../store/user/actions';
import HomeScreen from '../../components/HomeScreen';

// Map application state to component props
function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(userActions, dispatch),
  };
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HomeScreen);
