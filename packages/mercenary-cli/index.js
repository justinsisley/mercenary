#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const extfs = require('extfs');
const spawn = require('cross-spawn');
const execSync = require('child_process').execSync;
const chalk = require('chalk');
const updateNotifier = require('update-notifier');
const pkg = require('./package.json');

updateNotifier({ pkg }).notify();

const corePackage = 'mercenary-core';
const devPackage = 'mercenary-dev';
const starterPackage = 'mercenary-starter';

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

console.log('Initializing new Git repository...');
console.log();

// Initialize git repository
execSync(`git init "${projectDirectory}"`);

// Move into the project directory
process.chdir(projectDirectory);

function installCorePackage() {
  console.log('Installing mercenary core package...');
  console.log();

  return new Promise((resolve) => {
    const args = ['install', '--save-exact', corePackage];
    const child = spawn('npm', args);

    child.on('close', resolve);
  });
}

function installDevPackage() {
  console.log('Installing mercenary dev package...');
  console.log();

  return new Promise((resolve) => {
    const args = ['install', '--save-exact', '--save-dev', devPackage];
    const child = spawn('npm', args);

    child.on('close', resolve);
  });
}

function installStarterPackage() {
  console.log('Installing mercenary starter package...');
  console.log();

  return new Promise((resolve) => {
    const args = ['install', '--no-save', starterPackage];
    const child = spawn('npm', args);

    child.on('close', resolve);
  });
}

function runSetup() {
  const setupPath = path.resolve(
    process.cwd(),
    'node_modules',
    'mercenary-core',
    'tasks',
    'setup.js'
  );

  // Run the setup task
  require(setupPath)(); // eslint-disable-line
}

(async function start() {
  const coreExitCode = await installCorePackage();
  if (coreExitCode !== 0) {
    console.log(chalk.red(`Failed to install ${corePackage}.`));
    console.log();
    process.exit(1);
  }

  const devExitCode = await installDevPackage();
  if (devExitCode !== 0) {
    console.log(chalk.red(`Failed to install ${devPackage}.`));
    console.log();
    process.exit(1);
  }

  const starterExitCode = await installStarterPackage();
  if (starterExitCode !== 0) {
    console.log(chalk.red(`Failed to install ${starterPackage}.`));
    console.log();
    process.exit(1);
  }

  runSetup();
}());
