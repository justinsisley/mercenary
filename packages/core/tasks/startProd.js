const path = require('path');
const cp = require('child_process');

const pm2 = require.resolve('.bin/pm2-docker');
const serverIndex = path.join(__dirname, '../server/index.js');

// FIXME: since the true prod via docker doesn't use this, this function should
// be cleaned up. In the true prod via docker task, we don't want to have the
// extra overhead of running the task with NPM. We want to run it directly.
const prod = (options = { async: false, mode: 'production' }) => {
  let exec = cp.execSync;

  if (options.async) {
    exec = cp.exec;
  }

  let command = `${pm2} start`;
  let args = '-i 0 -- -env production';

  if (options.mode !== 'production') {
    command = 'node';
    args = `--env="${options.mode}"`;
  }

  return exec(
    `NODE_ENV=${options.mode} ${command} "${serverIndex}" ${args}`,
    { stdio: 'inherit' }
  );
};

module.exports = prod;
