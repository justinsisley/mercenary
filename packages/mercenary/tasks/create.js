const fs = require('fs');
const path = require('path');
const cp = require('child_process');

const boilerplate = path.join(__dirname, '../boilerplate');
const destination = path.join(__dirname, '../../../');
const clientDir = path.join(destination, './client');
const serverDir = path.join(destination, './server');
const install = require('./install');

const exec = (command) => {
  try {
    cp.execSync(command);
  } catch (err) {} // eslint-disable-line
};

const create = () => {
  try {
    fs.readDirSync(clientDir);
    fs.readDirSync(serverDir);
  } catch (error) {
    exec(`
      cp -R "${boilerplate}/client" "${destination}";
      cp -R "${boilerplate}/server" "${destination}";
    `);

    install();
  }
};

module.exports = create;
