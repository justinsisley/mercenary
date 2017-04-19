import { handleActions } from 'redux-actions';
import { setIsFetching, setAccountCreated, setAccountVerified, setError } from './actions';
import { setToken } from '../session/actions';

const accountStatus = [
  'new_account',
  'verified_account',
];

const initialState = {
  status: null,
  _fetching: false,
  _error: null,
};

const accountVerified = () => {
  return {
    status: accountStatus[1],
    _fetching: false,
    _error: null,
  };
};

export const reducer = handleActions({
  [setIsFetching]: (state) => {
    return {
      ...state,
      _fetching: true,
      _error: null,
    };
  },

  [setAccountCreated]: () => {
    return {
      status: accountStatus[0],
      _fetching: false,
      _error: null,
    };
  },

  [setAccountVerified]: accountVerified,
  [setToken]: accountVerified,

  [setError]: (state, action) => {
    return {
      ...state,
      _fetching: false,
      _error: action.payload.response,
    };
  },
}, initialState);

export default reducer;
