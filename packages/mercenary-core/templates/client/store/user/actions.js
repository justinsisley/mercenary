import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import * as schema from '../schema';

export const setUser = createAction('set user');
export const setIsFetching = createAction('set user.isFetching');

export const fetchUserById = (userId) => {
  return (dispatch, getState, api) => {
    dispatch(setIsFetching());

    // Attempt to get cached version
    const state = getState();
    const user = state.entities.users[userId];
    if (user) {
      dispatch(setUser(normalize(user, schema.user)));
      return;
    }

    // No cached version, fetch from API
    api.fetchUserById(userId)
    // .then(api.checkStatus(dispatch))
    .then(response => normalize(response.data, schema.user))
    .then(response => dispatch(setUser(response)));
    // .catch(api.errorHandler(dispatch));
  };
};
