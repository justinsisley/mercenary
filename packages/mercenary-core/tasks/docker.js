const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();
const dockerDir = path.join(__dirname, '../docker');

const exec = (command) => {
  try {
    cp.execSync(command);
  } catch (err) {} // eslint-disable-line
};

// Add Docker-related files
const docker = () => {
  exec(`cp "${dockerDir}/Dockerfile" "${cwd}/Dockerfile"`);
  exec(`cp "${dockerDir}/dockerignore" "${cwd}/.dockerignore"`);
};

module.exports = docker;
