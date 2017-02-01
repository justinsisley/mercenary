// This is similar to how `env` works in Babel:
// https://babeljs.io/docs/usage/babelrc/#env-option
// It’s also nice that we can enforce `NODE_ENV` being specified.
const env = process.env.BABEL_ENV || process.env.NODE_ENV;
if (env !== 'development' && env !== 'production') {
  throw new Error(`
    Using \`babel-preset-mercenary\` requires that you specify \`NODE_ENV\` or
    \`BABEL_ENV\` environment variables. Valid values are "development",
    "test", and "production". Instead, received: ${JSON.stringify(env)}.
  `);
}

const presets = [
  // eslint-disable-next-line
  [require('babel-preset-env').default, {
    targets: {
      browsers: ['last 2 versions', 'safari >= 7'],
    },
    modules: false,
  }],
  require.resolve('babel-preset-stage-0'),
  require.resolve('babel-preset-react'),
];

if (env === 'development') {
  presets.push(require.resolve('babel-preset-react-hmre'));
}

module.exports = {
  presets,
};
