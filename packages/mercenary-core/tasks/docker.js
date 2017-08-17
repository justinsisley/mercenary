const cp = require('child_process');
const fs = require('fs');
const path = require('path');

const cwd = process.cwd();

const dockerFileSource = path.join(__dirname, '../Dockerfile');
const dockerIgnoreSource = path.join(__dirname, '../dockerignore');

const dockerFileDest = `${cwd}/Dockerfile`;
const dockerIgnoreDest = `${cwd}/.dockerignore`;

const readFile = filepath => fs.readFileSync(filepath, { encoding: 'utf8' });

// Host project's package.json
const packageJson = readFile(`${cwd}/package.json`);
const parsedPackageJson = JSON.parse(packageJson);
const appName = parsedPackageJson.name;
const appVersion = parsedPackageJson.version;
const buildTag = `${appName}_${appVersion}`;

// Clean up the workspace
function clean() {
  cp.execSync(`rm "${dockerFileDest}"`);
  cp.execSync(`rm "${dockerIgnoreDest}"`);
}

// Add Docker-related files
function dockerFiles() {
  cp.execSync(`cp "${dockerFileSource}" "${dockerFileDest}"`);
  cp.execSync(`cp "${dockerIgnoreSource}" "${dockerIgnoreDest}"`);
}

function build() {
  cp.execSync(`docker build -t ${buildTag} .`, { stdio: 'inherit' });
}

function run() {
  cp.execSync(`docker run -p 3325:3325 -d ${buildTag}`, { stdio: 'inherit' });
}

function dockerBuild() {
  dockerFiles();
  build();
  clean();
}

function dockerRun() {
  dockerFiles();
  build();
  run();
  clean();
}

module.exports = {
  dockerFiles,
  dockerBuild,
  dockerRun,
};
