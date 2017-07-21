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
const testPackage = 'mercenary-test';
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

console.log('Installing mercenary core packages...');
console.log();

function installCore(callback) {
  const args = ['install', '--save-exact', corePackage];
  const child = spawn('npm', args, { stdio: 'inherit' });

  child.on('close', callback);
}

function installTest(callback) {
  const args = ['install', '--save-exact', testPackage];
  const child = spawn('npm', args, { stdio: 'inherit' });

  child.on('close', callback);
}

function initializeGit() {
  execSync(`git init "${projectDirectory}"`);
};

function runSetup() {
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

initializeGit();

installCore((coreExitCode) => {
  if (coreExitCode !== 0) {
    console.log(chalk.red(`Failed to install ${corePackage}.`));
    console.log();
    process.exit(1);
  }

  installTest((testExitCode) => {
    if (coreExitCode !== 0) {
      console.log(chalk.red(`Failed to install ${testPackage}.`));
      console.log();
      process.exit(1);
    }

    runSetup();
  });
});
