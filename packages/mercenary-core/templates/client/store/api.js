import log from 'loglevel';
import { getUsers } from './users/endpoints';
import { getTodos } from './todos/endpoints';

export default {
  // Check for authentication and authorization.
  // NOTE: You may want to pass this function a dispatcher so you can dispatch
  // some type of error action.
  checkStatus() {
    return (response) => {
      switch (response.status) {
        case 401: log.warn('User not authorized to take this action', response);
          break;
        case 403: log.warn('User not authenticated', response);
          break;
        default: // no-op
      }

      return response;
    };
  },

  // Handle error status codes
  // NOTE: Again, you may want to pass this function a dispatcher so you can
  // dispatch some type of error action.
  errorHandler() {
    return (response) => {
      log.warn('API error', response);

      return response;
    };
  },

  getUsers,
  getTodos,
};
