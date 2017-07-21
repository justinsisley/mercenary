const execSync = require('child_process').execSync;

const install = () => {
  execSync('rm -rf node_modules package-lock.json && npm install', { stdio: 'inherit' });
};

module.exports = install;
