import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { requestLoginEmail } from '../../store/session/actions';
import LoginForm from '../../components/LoginForm';

// Map application state to component props
function mapStateToProps(state) {
  return {
    requestSuccess: state.session.requestSuccess,
    requestFailedMessage: state.session.requestFailedMessage,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    requestLoginEmail,
  }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LoginForm);
