import { combineReducers } from 'redux';
// import { routerReducer as routing } from 'react-router-redux';
import entities from './entities/reducers';
import users from './users/reducers';

export default combineReducers({
  // routing,
  entities,
  users,
});
