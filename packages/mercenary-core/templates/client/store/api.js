import log from 'loglevel';
import session from './session/endpoints';
import logout from '../utils/logout';

export default {
  // Handle API errors application-wide
  handleError(dispatch, error) {
    switch (error.response.status) {
      case 401:
        logout();
        break;

      case 403:
        log.warn('User not authorized to take this action');
        break;

      default: // no-op
    }
  },

  ...session,
};
