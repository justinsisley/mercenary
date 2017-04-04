import { handleActions } from 'redux-actions';
import * as todosActions from './actions';

const initialState = {
  response: [],
  _fetching: false,
};

export const reducer = handleActions({
  [todosActions.setIsFetching]: (state) => {
    return {
      ...state,
      _fetching: true,
    };
  },

  [todosActions.setTodos]: (state, action) => {
    return {
      ...state,
      response: action.payload.responseData,
      _fetching: false,
    };
  },
}, initialState);

export default reducer;
