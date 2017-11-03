import { connect } from 'react-redux';
import RequireAuth from '../../components/RequireAuth';

// Map application state to component props
function mapStateToProps(state) {
  return {
    token: state.session.token,
  };
}

// Connect component to store
export default connect(mapStateToProps)(RequireAuth);

