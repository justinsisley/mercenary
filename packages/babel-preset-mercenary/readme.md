# babel-preset-mercenary

This package includes the Babel preset used by [mercenary](https://github.com/justinsisley/mercenary).  
Please refer to its documentation:

* [Getting Started](https://github.com/justinsisley/mercenary/blob/master/README.md#getting-started) – How to create a new app.
* [User Guide](https://github.com/justinsisley/mercenary/blob/master/packages/react-scripts/template/README.md) – How to develop apps bootstrapped with mercenary.

## Usage in Mercenary projects

The easiest way to use this configuration is with [mercenary](https://github.com/justinsisley/mercenary), which includes it by default. **You don’t need to install it separately in mercenary projects.**

## Usage Outside of Mercenary

If you want to use this Babel preset in a project not built with mercenary, you can install it with following steps.

First, [install Babel](https://babeljs.io/docs/setup/).

Then create a file named `.babelrc` with following contents in the root folder of your project:

  ```js
  {
    "presets": ["mercenary"]
  }
  ```

This preset uses the `useBuiltIns` option with [transform-object-rest-spread](http://babeljs.io/docs/plugins/transform-object-rest-spread/) and [transform-react-jsx](http://babeljs.io/docs/plugins/transform-react-jsx/), which assumes that `Object.assign` is available or polyfilled.