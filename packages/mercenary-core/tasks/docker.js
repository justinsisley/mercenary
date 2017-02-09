const path = require('path');
const cp = require('child_process');

const cwd = process.cwd();
const templatesDir = path.join(__dirname, '../templates');

// Add Docker-related files
const docker = () => {
  cp.execSync(`cp "${templatesDir}/Dockerfile" "${cwd}/Dockerfile"`);
  cp.execSync(`cp "${templatesDir}/dockerignore" "${cwd}/.dockerignore"`);
};

module.exports = docker;
