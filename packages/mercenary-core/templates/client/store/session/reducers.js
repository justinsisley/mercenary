import { handleActions } from 'redux-actions';
import { setIsFetching, setToken, unsetToken, setError } from './actions';

const initialState = {
  token: '',
  _fetching: false,
  _error: null,
};

export const reducer = handleActions({
  [setIsFetching]: (state) => {
    return {
      ...state,
      _fetching: true,
      _error: null,
    };
  },

  [setToken]: (state, action) => {
    return {
      token: action.payload.token,
      _fetching: false,
      _error: null,
    };
  },

  [unsetToken]: () => initialState,

  [setError]: (state, action) => {
    return {
      ...state,
      _fetching: false,
      _error: action.payload.response,
    };
  },
}, initialState);

export default reducer;
