import { handleActions } from 'redux-actions';
import { setGetUsersSuccess, setGetUserSuccess } from './actions';

const initialState = {};

export default handleActions({
  [setGetUsersSuccess]: (state, action) => {
    const users = {};

    action.payload.forEach((user) => {
      users[user.id] = user;
    });

    return {
      ...state,
      ...users,
    };
  },

  [setGetUserSuccess]: (state, action) => {
    return {
      ...state,
      [action.payload.id]: action.payload,
    };
  },
}, initialState);
