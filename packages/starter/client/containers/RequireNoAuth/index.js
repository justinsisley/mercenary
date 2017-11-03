import { connect } from 'react-redux';
import RequireNoAuth from '../../components/RequireNoAuth';

// Map application state to component props
function mapStateToProps(state) {
  return {
    token: state.session.token,
  };
}

// Connect component to store
export default connect(mapStateToProps)(RequireNoAuth);

