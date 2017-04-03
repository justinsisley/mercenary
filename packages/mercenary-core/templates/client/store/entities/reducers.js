import { handleActions } from 'redux-actions';
import * as users from '../users/actions';

const initialState = {
  users: {},
};

export const reducer = handleActions({
  [users.setUsers]: (state, action) => {
    return {
      users: {
        ...state.users,
        ...action.payload.normalizedData.entities.users,
      },
    };
  },
}, initialState);

export default reducer;
