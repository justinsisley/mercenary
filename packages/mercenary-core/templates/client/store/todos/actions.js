import { createAction } from 'redux-actions';
import { normalize } from 'normalizr';
import * as schema from '../schema';

export const setTodos = createAction('set todos');
export const setError = createAction('set todos.error');
export const setIsFetching = createAction('set todos.isFetching');

export const getTodos = () => {
  return (dispatch, getState, api) => {
    dispatch(setIsFetching());

    // Attempt to get cached API response
    const { todos } = getState();
    if (todos.response.length) {
      const normalizedData = normalize(todos.response, schema.todoListSchema);
      const responseData = todos.response;

      dispatch(setTodos({
        normalizedData,
        responseData,
      }));

      return;
    }

    // We want to give the action both the normalized data, and the original
    // response data.
    let responseData;

    // No cached version, get from API
    api.getTodos()
    .then(api.checkStatus(dispatch))
    .then((response) => {
      responseData = response.data;
      return normalize(response.data, schema.todoListSchema);
    })
    .then(normalizedData => dispatch(setTodos({
      normalizedData,
      responseData,
    })))
    .catch(error => dispatch(setError(error)));
  };
};
