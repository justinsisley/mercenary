module.exports = {
  root: true,

  parser: 'babel-eslint',

  extends: 'airbnb',

  env: {
    browser: true,
    commonjs: true,
    es6: true,
    mocha: true,
    node: true,
  },

  globals: {
    assert: true,
    expect: true,
  },

  plugins: [
    'class-property',
  ],

  rules: {
    'arrow-body-style': 'off',
    'max-len': 'off',
    'no-underscore-dangle': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'jsx-a11y/label-has-for': 'warn',

    'react/jsx-filename-extension': 'off',
  },
};
