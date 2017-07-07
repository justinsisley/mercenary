import { combineReducers } from 'redux';
import session from './session/reducers';
import users from './users/reducers';

export default combineReducers({
  session,
  users,
});
