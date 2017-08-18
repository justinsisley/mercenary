#!/usr/bin/env node

const argv = require('yargs').argv;

if (argv.setup) {
  require('./tasks/setup')(); // eslint-disable-line
}

if (argv.test) {
  require('./tasks/test')(); // eslint-disable-line
}

if (argv.testWatch) {
  require('./tasks/testWatch')(); // eslint-disable-line
}

if (argv.e2e) {
  require('./tasks/build')({ silent: true }); // eslint-disable-line
  const prod = require('./tasks/startProd')({ async: true }); // eslint-disable-line
  require('./tasks/e2e')({ serverProcess: prod }); // eslint-disable-line
}

if (argv.build) {
  require('./tasks/build')({ static: true }); // eslint-disable-line
}

if (argv.start) {
  require('./tasks/startDev')(); // eslint-disable-line
}

if (argv.prod) {
  require('./tasks/startProd')(); // eslint-disable-line
}

if (argv.prodLocal) {
  require('./tasks/startProd')({ mode: 'local' }); // eslint-disable-line
}

if (argv.deploy) {
  require('./tasks/deploy')(); // eslint-disable-line
}

if (argv.deployInit) {
  require('./tasks/deployInit')(); // eslint-disable-line
}

if (argv.dockerBuild) {
  require('./tasks/docker').dockerBuild(); // eslint-disable-line
}

if (argv.dockerRun) {
  require('./tasks/docker').dockerRun(); // eslint-disable-line
}

if (argv.clean) {
  require('./tasks/clean')(); // eslint-disable-line
}
