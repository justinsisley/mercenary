import { connect } from 'react-redux';
import LoginScreen from '../../screens/Login';

// Map application state to component props
function mapStateToProps(state) {
  return { ...state.session };
}

// Connect component to store
export default connect(
  mapStateToProps,
)(LoginScreen);
