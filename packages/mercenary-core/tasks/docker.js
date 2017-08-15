const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();

const dockerFileSource = path.join(__dirname, '../Dockerfile');
const dockerIgnoreSource = path.join(__dirname, '../dockerignore');

const dockerFileDest = `${cwd}/Dockerfile`;
const dockerIgnoreDest = `${cwd}/.dockerignore`;

// Add Docker-related files
const docker = () => {
  cp.execSync(`cp "${dockerFileSource}" "${dockerFileDest}"`);
  cp.execSync(`cp "${dockerIgnoreSource}" "${dockerIgnoreDest}"`);
};

module.exports = docker;
