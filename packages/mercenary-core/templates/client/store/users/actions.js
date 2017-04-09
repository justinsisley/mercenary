import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import * as schema from '../schema';

export const setUsers = createAction('set users');
export const setError = createAction('set users.error');
export const setIsFetching = createAction('set users.isFetching');

export const getUsers = () => {
  return (dispatch, getState, api) => {
    dispatch(setIsFetching());

    // Attempt to get cached API response
    const { users } = getState();
    if (users.response.length) {
      const normalizedData = normalize(users.response, schema.userListSchema);
      const responseData = users.response;

      dispatch(setUsers({
        normalizedData,
        responseData,
      }));

      return;
    }

    // We want to give the action both the normalized data, and the original
    // response data.
    let responseData;

    // No cached version, get from API
    api.getUsers()
    .then(api.checkStatus(dispatch))
    .then((response) => {
      responseData = response.data;
      return normalize(response.data, schema.userListSchema);
    })
    .then(normalizedData => dispatch(setUsers({
      normalizedData,
      responseData,
    })))
    .catch(error => dispatch(setError(error)));
  };
};
