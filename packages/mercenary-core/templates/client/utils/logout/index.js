import tokenpress from 'tokenpress/browser';

export default () => {
  // Remove JWT from localStorage
  tokenpress.browser.delete();

  // Full reload to clear the store
  window.location.pathname = '/login';
};
