import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as session from '../../store/session/actions';
import CompleteLogin from '../../screens/CompleteLogin';

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ ...session }, dispatch);
}

// Connect component to store
export default connect(
  null,
  mapDispatchToProps,
)(CompleteLogin);
