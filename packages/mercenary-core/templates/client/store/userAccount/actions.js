import { createAction } from 'redux-actions';

export const setAccountCreated = createAction('set account.created');
export const setAccountVerified = createAction('set account.verified');
export const setError = createAction('set account.error');
export const setIsFetching = createAction('set account.isFetching');

export const create = ({ email, name }) => {
  return (dispatch, getState, api) => {
    dispatch(setIsFetching());

    api.createUserAccount({ email, name })
    .then(api.checkStatus(dispatch))
    .then(() => {
      dispatch(setAccountCreated());
    })
    .catch(error => dispatch(setError(error)));
  };
};

export const verify = (verificationToken) => {
  return (dispatch, getState, api) => {
    dispatch(setIsFetching());

    api.verifyUserAccount(verificationToken)
    .then(api.checkStatus(dispatch))
    .then((sessionToken) => {
      dispatch(setAccountVerified(sessionToken));
    })
    .catch(error => dispatch(setError(error)));
  };
};
