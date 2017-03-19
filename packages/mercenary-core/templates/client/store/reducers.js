import { combineReducers } from 'redux';
// import { routerReducer as routing } from 'react-router-redux';
import entities from './entities/reducers';
import user from './user/reducers';

export default combineReducers({
  // routing,
  entities,
  user,
});
