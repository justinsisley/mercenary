import axios from 'axios';
import { createAction } from 'redux-actions';

export const setToken = createAction('set session.token');
export const unsetToken = createAction('unset session.token');
export const setError = createAction('set session.error');
export const setIsFetching = createAction('set session.isFetching');

export const logIn = (email) => {
  return (dispatch, getState, api) => {
    dispatch(setIsFetching());

    api.logIn(email)
    .then(api.checkStatus(dispatch))
    .then((response) => {
      const { token } = response.data;

      // Side-effects
      axios.defaults.headers.common.Authorization = token;

      dispatch(setToken({ token }));
    })
    .catch(error => dispatch(setError(error)));
  };
};

export const logOut = () => {
  return (dispatch) => {
    // Side-effects
    axios.defaults.headers.common.Authorization = null;

    dispatch(unsetToken());
  };
};
