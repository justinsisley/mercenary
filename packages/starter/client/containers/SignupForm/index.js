import { connect } from 'react-redux';
import SignupForm from '../../components/SignupForm';

// Map application state to component props
function mapStateToProps(state) {
  return {
    requestSuccess: state.session.requestSuccess,
    requestFailedMessage: state.session.requestFailedMessage,
  };
}

// Connect component to store
export default connect(mapStateToProps)(SignupForm);
