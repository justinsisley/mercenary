/* eslint-disable import/no-unresolved */

// Compile JavaScript on the fly
require('babel-register');

// Return empty string for CSS modules to avoid parse errors
require.extensions['.css'] = () => '';
