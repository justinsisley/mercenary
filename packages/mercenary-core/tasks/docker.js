const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();

const dockerFileSource = path.join(__dirname, '../Dockerfile');
const dockerIgnoreSource = path.join(__dirname, '../dockerignore');

const dockerFileDest = `${cwd}/Dockerfile`;
const dockerIgnoreDest = `${cwd}/.dockerignore`;

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

function dockerBuild() {
  dockerFiles();
  clean();
}

function dockerRun() {
  dockerFiles();
  dockerBuild();
  clean();
}

module.exports = {
  dockerFiles,
  dockerBuild,
  dockerRun,
};
