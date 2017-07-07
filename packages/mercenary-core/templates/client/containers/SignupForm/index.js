import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as session from '../../store/session/actions';
import SignupForm from '../../components/SignupForm';

// Map application state to component props
function mapStateToProps(state) {
  return {
    requestSuccess: state.session.requestSuccess,
    requestFailedMessage: state.session.requestFailedMessage,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...session }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignupForm);
