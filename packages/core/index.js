#!/usr/bin/env node
/* eslint-disable global-require */
const argv = require('yargs').argv;

if (argv.setup) require('./tasks/setup')();
if (argv.test) require('./tasks/test')();
if (argv.testWatch) require('./tasks/testWatch')();
if (argv.e2e) require('./tasks/e2e')();
if (argv.build) require('./tasks/build')({ static: true });
if (argv.analyze) require('./tasks/analyze')();
if (argv.start) require('./tasks/startDev')();
if (argv.prod) require('./tasks/startProd')();
if (argv.prodLocal) require('./tasks/startProd')({ mode: 'local' });
if (argv.release) require('./tasks/release')();
if (argv.deploy) require('./tasks/deploy')();
if (argv.dockerBuild) require('./tasks/docker').dockerBuild();
if (argv.dockerRun) require('./tasks/docker').dockerRun();
if (argv.clean) require('./tasks/clean')();
