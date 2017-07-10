const path = require('path');
const cp = require('child_process');

const pm2 = require.resolve('.bin/pm2');
const serverIndex = path.join(__dirname, '../server/index.js');

const prod = (options = { async: false, mode: 'production' }) => {
  let exec = cp.execSync;

  if (options.async) {
    exec = cp.exec;
  }

  let command = `${pm2} start`;
  let args = '-i 0';

  // FIXME: should be !== 'production'
  if (options.mode) {
    command = 'node';
    args = '';
  }

  return exec(
    `NODE_ENV=${options.mode} ${command} "${serverIndex}" ${args} --env="${options.mode}"`,
    { stdio: 'inherit' }
  );
};

module.exports = prod;
