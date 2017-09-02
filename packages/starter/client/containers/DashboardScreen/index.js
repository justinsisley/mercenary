import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifySessionToken } from '../../store/session/actions';
import DashboardScreen from '../../screens/Dashboard';

// Map application state to component props
function mapStateToProps(state) {
  return {
    jwt: state.session.jwt,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    verifySessionToken,
  }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DashboardScreen);
