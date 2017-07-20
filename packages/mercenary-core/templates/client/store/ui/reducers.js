import { handleActions } from 'redux-actions';
import { setUserFilter } from './actions';

const initialState = {
  userFilter: '',
};

export default handleActions({
  [setUserFilter]: (state, action) => {
    return {
      ...state,
      userFilter: action.payload,
    };
  },
}, initialState);
