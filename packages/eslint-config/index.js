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
    __VERSION__: true,
    assert: true,
    expect: true,
    page: true,
  },

  plugins: [
    'class-property',
  ],

  rules: {
    'arrow-body-style': 'off',
    'max-len': 'off',
    'prefer-destructuring': 'off',
    'no-underscore-dangle': 'off',

    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',

    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/label-has-for': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',

    'react/jsx-filename-extension': 'off',
    'react/no-unused-state': 'warn',
  },
};
