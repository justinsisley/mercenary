const execSync = require('child_process').execSync;

const install = () => {
  execSync('npm install', { stdio: 'inherit' });
};

module.exports = install;
