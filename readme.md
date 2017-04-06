<p align="center">
  <a href="/packages/mercenary-core/readme.md">
    <img alt="mercenary" src="https://image.flaticon.com/icons/svg/206/206879.svg" width="144">
  </a>
</p>

<h3 align="center">
  Mercenary
</h3>

<p align="center">
  The Force Multiplier Web App Stack
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/mercenary"><img src="https://img.shields.io/npm/v/mercenary.svg?style=flat-square"></a>
  <a href="https://www.npmjs.com/package/mercenary"><img src="https://img.shields.io/npm/dm/mercenary.svg?style=flat-square"></a>
</p>

## Quick Start

Install Mercenary globally:

```bash
npm install -g mercenary
```

Create a new Mercenary app:

```bash
cd ~/my-projects-dir
mercenary my-new-app && cd my-new-app
```

Start the development server:

```bash
npm start
```

Run unit tests:

```bash
npm test
```

Start the unit test watcher:

```bash
npm run test:watch
```

Run end-to-end tests:

```bash
npm run e2e
```

Build the client and start the production server:

```bash
npm run prod
```

Deploy the Dockerized application to ElasticBeanstalk:

```bash
npm run deploy
```

Delete build and test artifacts:

```bash
npm run clean
```


## Packages

This repository is managed as a monorepo. It contains [several npm packages](/packages). Publishing is managed by [Lerna](https://github.com/lerna/lerna).

| Package | Version | Docs | Description |
|---------|---------|------|-------------|
| [`mercenary`](/packages/mercenary) | [![npm](https://img.shields.io/npm/v/mercenary.svg?style=flat-square)](https://www.npmjs.com/package/mercenary) | [![](https://img.shields.io/badge/API%20Docs-markdown-green.svg?style=flat-square)](/packages/mercenary/readme.md) | The CLI for creating new Mercenary projects |
| [`mercenary-core`](/packages/mercenary-core) | [![npm](https://img.shields.io/npm/v/mercenary-core.svg?style=flat-square)](https://www.npmjs.com/package/mercenary-core) | [![](https://img.shields.io/badge/API%20Docs-markdown-green.svg?style=flat-square)](/packages/mercenary-core/readme.md) | The core Mercenary codebase |
| [`babel-preset-mercenary`](/packages/babel-preset-mercenary) | [![npm](https://img.shields.io/npm/v/babel-preset-mercenary.svg?style=flat-square)](https://www.npmjs.com/package/babel-preset-mercenary) | [![](https://img.shields.io/badge/API%20Docs-markdown-green.svg?style=flat-square)](/packages/babel-preset-mercenary/readme.md) | The Babel preset for Mercenary projects |
| [`eslint-config-mercenary`](/packages/eslint-config-mercenary) | [![npm](https://img.shields.io/npm/v/eslint-config-mercenary.svg?style=flat-square)](https://www.npmjs.com/package/eslint-config-mercenary) | [![](https://img.shields.io/badge/API%20Docs-markdown-green.svg?style=flat-square)](/packages/eslint-config-mercenary/readme.md) |  The ESLint preset for Mercenary projects |

## Credits

Icon by [Flaticon](http://www.flaticon.com/)
