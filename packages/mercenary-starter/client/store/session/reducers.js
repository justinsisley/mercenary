import axios from 'axios';
import tokenpress from 'tokenpress/browser';
import { handleActions } from 'redux-actions';
import {
  setLoginEmailRequestSuccess,
  setLoginEmailRequestFailed,

  setVerifyLoginTokenSuccess,
  setVerifyLoginTokenFailed,

  setVerifySessionTokenSuccess,
  setVerifySessionTokenFailed,
} from './actions';

// Attempt to get the token from localStorage when the app bootstraps
const savedToken = tokenpress.browser.get();
axios.defaults.headers.common.Authorization = savedToken;

const initialState = {
  requestSuccess: false,
  requestFailed: false,
  requestFailedMessage: '',

  verifyFailed: false,

  token: savedToken,

  // NOTE: For example only
  jwt: {},
  jwtError: '',
};

export default handleActions({
  [setLoginEmailRequestSuccess]: () => {
    return {
      ...initialState,
      requestSuccess: true,
    };
  },

  [setLoginEmailRequestFailed]: (state, action) => {
    return {
      ...initialState,
      requestFailed: true,
      requestFailedMessage: action.payload,
    };
  },

  [setVerifyLoginTokenSuccess]: (state, action) => {
    return {
      ...initialState,
      token: action.payload,
    };
  },

  [setVerifyLoginTokenFailed]: () => {
    return {
      ...initialState,
      verifyFailed: true,
    };
  },

  // NOTE: For example only
  [setVerifySessionTokenSuccess]: (state, action) => {
    return {
      ...state,
      jwt: action.payload,
    };
  },

  // NOTE: For example only
  // Test token failure by modifying the localStorage token, or by letting it expire
  [setVerifySessionTokenFailed]: (state, action) => {
    return {
      ...state,
      jwtError: action.payload,
    };
  },
}, initialState);
