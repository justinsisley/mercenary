import { handleActions } from 'redux-actions';
import * as users from './actions';

const initialState = {
  _fetching: false,
};

export const reducer = handleActions({
  [users.setUser]: (state, action) => {
    const { entities, result } = action.payload;

    return {
      ...initialState,
      ...entities.users[result],
      _fetching: false,
    };
  },

  [users.setIsFetching]: () => {
    return {
      ...initialState,
      _fetching: true,
    };
  },
}, initialState);

export default reducer;
