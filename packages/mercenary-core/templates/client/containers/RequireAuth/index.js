import { connect } from 'react-redux';
import RequireAuth from '../../components/RequireAuth';

// Map application state to component props
function mapStateToProps(state) {
  return { ...state.session };
}

// Connect component to store
export default connect(mapStateToProps)(RequireAuth);

