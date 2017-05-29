#!/usr/bin/env node

const argv = require('yargs').argv;
const setup = require('./tasks/setup');
const lint = require('./tasks/lint');
const test = require('./tasks/test');
const testWatch = require('./tasks/testWatch');
const e2e = require('./tasks/e2e');
const build = require('./tasks/build');
const startDev = require('./tasks/startDev');
const startProd = require('./tasks/startProd');
const deploy = require('./tasks/deploy');
const deployInit = require('./tasks/deployInit');

if (argv.setup) {
  setup();
}

if (argv.lint) {
  lint();
}

if (argv.test) {
  test();
}

if (argv.testWatch) {
  testWatch();
}

if (argv.e2e) {
  build({ silent: true });
  const prod = startProd({ async: true });
  e2e({ serverProcess: prod });
}

if (argv.build) {
  build();
}

if (argv.start) {
  startDev();
}

if (argv.prod) {
  build();
  startProd();
}

if (argv.deploy) {
  deploy();
}

if (argv.deployInit) {
  deployInit();
}
