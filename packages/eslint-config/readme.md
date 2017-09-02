# eslint-config-mercenary

This package includes the shareable ESLint configuration used by [mercenary](https://github.com/justinsisley/mercenary).  
Please refer to its documentation:

* [Getting Started](https://github.com/justinsisley/mercenary/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/justinsisley/mercenary/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with mercenary.

## Usage in Mercenary Projects

The easiest way to use this configuration is with [mercenary](https://github.com/justinsisley/mercenary), which includes it by default. **You don’t need to install it separately in mercenary projects.**

## Usage Outside of Mercenary

If you want to use this ESLint configuration in a project not built with mercenary, you can install it with following steps.

First, install this package, ESLint and the necessary plugins.

  ```sh
  npm install --save-dev eslint-config-mercenary babel-eslint@7.0.0 eslint@3.8.1 eslint-plugin-flowtype@2.21.0 eslint-plugin-import@2.0.1 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-react@6.4.1
  ```

Then create a file named `.eslintrc` with following contents in the root folder of your project:

  ```js
  {
    "extends": "mercenary"
  }
  ```

  That's it! You can override the settings from `eslint-config-mercenary` by editing the `.eslintrc` file. Learn more about [configuring ESLint](http://eslint.org/docs/user-guide/configuring) on the ESLint website.