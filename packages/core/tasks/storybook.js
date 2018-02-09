const fs = require('fs');
const path = require('path');
const execSync = require('child_process').execSync;
const glob = require('glob');

const cwd = process.cwd();
const configDir = path.join(__dirname, '../config/storybook');
const configTemplateFile = path.join(configDir, 'config.template.js');
const configFile = path.join(configDir, 'config.js');

const configTemplateContent = fs.readFileSync(configTemplateFile, { encoding: 'utf8' });

const files = glob.sync(`${cwd}/client/**/story.js`).map((file) => {
  return `require('${file}');`;
}).join('\n');

const configContent = configTemplateContent.replace('{{STORIES}}', files);
fs.writeFileSync(configFile, configContent);

const storybook = () => {
  execSync(
    `./node_modules/.bin/start-storybook -p 9001 -c ${configDir}`,
    { stdio: 'inherit' },
  );
};

module.exports = storybook;
