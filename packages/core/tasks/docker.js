const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const utils = require('../utils');

const cwd = process.cwd();

const dockerFileSource = path.join(__dirname, '../Dockerfile');
const dockerIgnoreSource = path.join(__dirname, '../dockerignore');

const dockerFileDest = `${cwd}/Dockerfile`;
const dockerIgnoreDest = `${cwd}/.dockerignore`;

const appName = utils.packageJSON.name;
const appVersion = utils.packageJSON.version;
const buildTag = `${appName}_${appVersion}`;

// Clean up the workspace
function clean() {
  cp.execSync(`rm "${dockerFileDest}"`);
  cp.execSync(`rm "${dockerIgnoreDest}"`);
}

// Add Docker files to host project's root
function dockerFiles(command = './node_modules/.bin/merc --prod') {
  let dockerFile = utils.readFileSync(dockerFileSource);
  dockerFile = dockerFile.replace('{{command}}', command);

  fs.writeFileSync(dockerFileDest, dockerFile);

  cp.execSync(`cp "${dockerIgnoreSource}" "${dockerIgnoreDest}"`);
}

// Build a Docker image
function build() {
  cp.execSync(`docker build -t ${buildTag} .`, { stdio: 'inherit' });
}

// Run an existing Docker image
function run() {
  cp.execSync(`docker run -p 3325:3325 -d ${buildTag}`, { stdio: 'inherit' });
}

// Perform local build
function dockerBuild() {
  dockerFiles('npm run prod:local');
  build();
  clean();
}

// Run Docker container locally
function dockerRun() {
  dockerFiles('npm run prod:local');
  build();
  run();
  clean();
}

module.exports = {
  dockerFiles,
  dockerBuild,
  dockerRun,
};
