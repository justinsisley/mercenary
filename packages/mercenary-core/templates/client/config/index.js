const marshall = require('marshall/lib');

// Configuration schema
const config = marshall({
  jwt: {
    localStorageKey: {
      doc: 'The localStorage key to store the JWT under',
      format: String,
      default: 'token',
      env: 'JWT_LOCALSTORAGE_KEY',
      arg: 'jwt-localstorage-key',
    },
  },
});

module.exports = config;
