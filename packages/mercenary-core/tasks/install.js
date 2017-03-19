const execSync = require('child_process').execSync;

function shouldUseYarn() {
  try {
    execSync('yarnpkg --version', { stdio: 'ignore' });
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

const install = () => {
  let command;

  if (shouldUseYarn()) {
    command = 'yarnpkg';
  } else {
    command = 'npm';
  }

  execSync(command, ['install'], { stdio: 'inherit' });
};

module.exports = install;
