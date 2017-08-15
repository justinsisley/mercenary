import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { verifyLoginToken } from '../../store/session/actions';
import CompleteLogin from '../../screens/CompleteLogin';

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    verifyLoginToken,
  }, dispatch);
}

// Connect component to store
export default connect(
  null,
  mapDispatchToProps,
)(CompleteLogin);
