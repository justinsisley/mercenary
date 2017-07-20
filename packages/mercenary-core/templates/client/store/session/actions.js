import axios from 'axios';
import tokenpress from 'tokenpress/browser';
import { createAction } from 'redux-actions';

export const setLoginEmailRequestSuccess = createAction('set session.request.success');
export const setLoginEmailRequestFailed = createAction('set session.request.failed');

export const setVerifyLoginTokenSuccess = createAction('set session.verify.success');
export const setVerifyLoginTokenFailed = createAction('set session.verify.failed');

export const setVerifySessionTokenSuccess = createAction('set session.token.success');
export const setVerifySessionTokenFailed = createAction('set session.token.failed');

export function requestLoginEmail(email) {
  return async (dispatch, getState, api) => {
    try {
      await api.requestLoginEmail(email);

      dispatch(setLoginEmailRequestSuccess(email));
    } catch (error) {
      api.handleError(dispatch, error);

      dispatch(setLoginEmailRequestFailed(error.response.data.message));
    }
  };
}

export function verifyLoginToken(loginToken) {
  return async (dispatch, getState, api) => {
    try {
      const response = await api.verifyLoginToken(loginToken);
      const token = response.data.token;

      // Save the token to localStorage
      tokenpress.browser.save(token);
      // Set the user token in the headers for all subsequent requests
      axios.defaults.headers.common.Authorization = token;

      dispatch(setVerifyLoginTokenSuccess(token));
    } catch (error) {
      api.handleError(dispatch, error);

      dispatch(setVerifyLoginTokenFailed(error.response.data));
    }
  };
}

// NOTE: For example only
export function verifySessionToken() {
  return async (dispatch, getState, api) => {
    try {
      const response = await api.verifySessionToken();

      dispatch(setVerifySessionTokenSuccess(response.data.jwt));
    } catch (error) {
      api.handleError(dispatch, error);

      dispatch(setVerifySessionTokenFailed(error.response));
    }
  };
}
