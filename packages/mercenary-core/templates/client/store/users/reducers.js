import { handleActions } from 'redux-actions';
import * as usersActions from './actions';

const initialState = {
  response: [],
  _fetching: false,
};

export const reducer = handleActions({
  [usersActions.setIsFetching]: (state) => {
    return {
      ...state,
      _fetching: true,
    };
  },

  [usersActions.setUsers]: (state, action) => {
    return {
      ...state,
      response: action.payload.responseData,
      _fetching: false,
    };
  },
}, initialState);

export default reducer;
