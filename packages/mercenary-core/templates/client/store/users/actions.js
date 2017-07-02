import { createAction } from 'redux-actions';

export const setGetUsersSuccess = createAction('set users.get.success');
export const setGetUsersFailed = createAction('set users.get.failed');

export const setGetUserSuccess = createAction('set user.get.success');
export const setGetUserFailed = createAction('set user.get.failed');

export function getUsers() {
  return (dispatch, getState, api) => {
    api.getUsers()
    .then((response) => {
      dispatch(setGetUsersSuccess(response.data));
    })
    .catch((error) => {
      api.handleError(dispatch, error);

      dispatch(setGetUsersFailed(error.response.data.message));
    });
  };
}

export function getUser(userId) {
  return (dispatch, getState, api) => {
    api.getUser(userId)
    .then((response) => {
      dispatch(setGetUserSuccess(response.data));
    })
    .catch((error) => {
      api.handleError(dispatch, error);

      dispatch(setGetUserFailed(error.response.data.message));
    });
  };
}
