import tokenpress from 'tokenpress/browser';

export default () => {
  // Remove JWT from localStorage
  tokenpress.browser.delete();

  // Full reload to reset application state
  window.location.pathname = '/';
};
