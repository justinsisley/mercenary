import { handleActions } from 'redux-actions';
import * as users from '../user/actions';

const initialState = {
  users: {},
};

export const reducer = handleActions({
  [users.setUser]: (state, action) => {
    return {
      ...initialState,
      users: {
        ...state.users,
        ...action.payload.entities.users,
      },
    };
  },
}, initialState);

export default reducer;
