const start = () => {
  process.env.NODE_ENV = 'development';
  process.env.BABEL_ENV = 'development';

  // eslint-disable-next-line global-require
  require('../server');
};

module.exports = start;
