const execSync = require('child_process').execSync;

const install = () => {
  execSync('rm package-lock.json && npm install', { stdio: 'inherit' });
};

module.exports = install;
