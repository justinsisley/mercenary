import { handleActions } from 'redux-actions';
import status from '../../constants/status';
import * as users from './actions';

const initialState = {
  _status: status.IDLE,
};

export const reducer = handleActions({
  [users.setUser]: (state, action) => {
    const { entities, result } = action.payload;

    return {
      ...initialState,
      ...entities.users[result],
      _status: status.IDLE,
    };
  },

  [users.setIsFetching]: () => {
    return {
      ...initialState,
      _status: status.FETCHING,
    };
  },
}, initialState);

export default reducer;
