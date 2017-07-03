import { combineReducers } from 'redux';
import session from './session/reducers';
import users from './users/reducers';
import ui from './ui/reducers';

export default combineReducers({
  session,
  users,
  ui,
});
