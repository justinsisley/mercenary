import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getUsers } from '../../store/users/actions';
import { getTodos } from '../../store/todos/actions';
import TodosScreen from '../../screens/TodosScreen/async';

// Map application state to component props
function mapStateToProps(state) {
  return {
    users: state.entities.users,
    todos: state.entities.todos,
  };
}

// Map actions to to props so they can be called directly
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getUsers, getTodos }, dispatch);
}

// Connect component to store
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TodosScreen);
