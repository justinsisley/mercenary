import { handleActions } from 'redux-actions';
import * as users from '../users/actions';
import * as todos from '../todos/actions';

const initialState = {
  users: {},
  todos: {},
};

export const reducer = handleActions({
  [users.setUsers]: (state, action) => {
    return {
      ...state,
      users: {
        ...state.users,
        ...action.payload.normalizedData.entities.users,
      },
    };
  },

  [todos.setTodos]: (state, action) => {
    return {
      ...state,
      todos: {
        ...state.todos,
        ...action.payload.normalizedData.entities.todos,
      },
    };
  },
}, initialState);

export default reducer;
