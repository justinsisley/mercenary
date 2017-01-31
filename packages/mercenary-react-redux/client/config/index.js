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
  mixPanelToken: {
    doc: 'The MixPanel token for event tracking',
    format: String,
    default: '9753a34980798dc65709f2592f6b1eee',
    env: 'MIXPANEL_TOKEN',
    arg: 'mixpanel-token',
  },
});

module.exports = config;
