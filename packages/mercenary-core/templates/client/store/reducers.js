import { combineReducers } from 'redux';
// import { routerReducer as routing } from 'react-router-redux';
import session from './session/reducers';
import entities from './entities/reducers';
import users from './users/reducers';
import todos from './todos/reducers';

export default combineReducers({
  // routing,
  session,
  entities,
  users,
  todos,
});
