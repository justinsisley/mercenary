const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const glob = require('glob');
const utils = require('../utils');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config/storybook');
const configTemplateFile = path.join(configDir, 'config.template.js');
const configFile = path.join(configDir, 'config.js');

const configTemplateContent = utils.readFileSync(configTemplateFile);

const files = glob.sync(`${cwd}/client/**/story.js`).map((file) => {
  return `require('${file}');`;
}).join('\n');

const configContent = configTemplateContent.replace('{{STORIES}}', files);
fs.writeFileSync(configFile, configContent);

const start = () => {
  execSync(
    `./node_modules/.bin/start-storybook -p 9001 -c ${configDir}`,
    { stdio: 'inherit' },
  );
};

const build = () => {
  execSync(
    `./node_modules/.bin/build-storybook -c ${configDir} -o ${cwd}/public/storybook`,
    { stdio: 'inherit' },
  );
};

module.exports = {
  start,
  build,
};
