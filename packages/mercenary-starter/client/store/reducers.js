import { combineReducers } from 'redux';
import ui from './ui/reducers';
import session from './session/reducers';
import users from './users/reducers';

export default combineReducers({
  ui,
  session,
  users,
});
