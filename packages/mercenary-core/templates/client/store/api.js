import log from 'loglevel';
import tokenpress from 'tokenpress/browser';
import session from './session/endpoints';

export default {
  // Handle API errors application-wide
  handleError(dispatch, error) {
    switch (error.response.status) {
      case 401:
        tokenpress.browser.delete();
        window.location = '/login';
        break;

      case 403:
        log.warn('User not authorized to take this action');
        break;

      default: // no-op
    }
  },

  ...session,
};
