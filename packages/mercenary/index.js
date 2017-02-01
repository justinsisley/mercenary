#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const extfs = require('extfs');
const spawn = require('cross-spawn');
const chalk = require('chalk');

const appName = process.argv[2];

if (!appName) {
  console.log();
  console.log(chalk.red('Please specify a project directory.'));
  console.log();

  process.exit(1);
}

const projectDirectory = path.join(process.cwd(), appName);

if (!extfs.isEmptySync(projectDirectory)) {
  console.log();
  console.log(chalk.red('The specified project directory is not empty.'));
  console.log();

  process.exit(1);
}

console.log();
console.log(`Creating a new mercenary app in ${chalk.green(projectDirectory)}`);
console.log();

fs.ensureDirSync(projectDirectory);

const packageJson = {
  name: appName,
  version: '0.1.0',
  private: true,
};

fs.writeFileSync(
  path.join(projectDirectory, 'package.json'),
  JSON.stringify(packageJson, null, 2)
);

process.chdir(projectDirectory);

console.log('Installing packages...');
console.log();

const installCore = (callback) => {
  const child = spawn('npm', ['install', '--save', '--save-exact', 'mercenary-core'], { stdio: 'inherit' });

  child.on('close', callback);
};

const runSetup = () => {
  const setupPath = path.resolve(
    process.cwd(),
    'node_modules',
    'mercenary-core',
    'tasks',
    'setup.js'
  );

  const setup = require(setupPath);

  setup();
};

installCore((code) => {
  if (code !== 0) {
    console.log(chalk.red('Failed to install mercenary-core.'));
    console.log();
    process.exit(1);
  }

  runSetup();
});
