const path = require('path');
const cp = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const utils = require('../utils');
const install = require('./install');

const cwd = process.cwd();
const templatesDir = path.join(cwd, '/node_modules/mercenary-starter');

const copyTemplates = () => {
  // Files
  cp.execSync(`cp "${templatesDir}/.babelrc" "${cwd}/.babelrc"`);
  cp.execSync(`cp "${templatesDir}/.eslintrc" "${cwd}/.eslintrc"`);
  cp.execSync(`cp "${templatesDir}/.flowconfig" "${cwd}/.flowconfig"`);
  cp.execSync(`cp "${templatesDir}/gitignore" "${cwd}/.gitignore"`);
  cp.execSync(`cp "${templatesDir}/config.js" "${cwd}/config.js"`);

  // Directories
  cp.execSync(`cp -R "${templatesDir}/client" "${cwd}/client"`);
  cp.execSync(`cp -R "${templatesDir}/server" "${cwd}/server"`);
  cp.execSync(`cp -R "${templatesDir}/email" "${cwd}/email"`);

  // Write customized readme.md
  const readme = utils.readFileSync(`${templatesDir}/readme.md`);
  const modifiedReadme = readme.replace('{name}', utils.packageJSON.name);
  fs.writeFileSync(`${cwd}/readme.md`, modifiedReadme);
};

const copyNpmScripts = () => {
  const packageJsonScripts = Object.assign({}, utils.packageJSON.scripts, {
    start: 'merc --start',
    test: 'merc --test',
    'test:watch': 'merc --testWatch',
    e2e: 'merc --e2e',
    storybook: 'merc --storybook',
    build: 'merc --build',
    analyze: 'merc --analyze',
    prod: 'merc --prod',
    'prod:local': 'merc --prodLocal',
    release: 'merc --release',
    deploy: 'merc --deploy',
    'docker:build': 'merc --dockerBuild',
    'docker:run': 'merc --dockerRun',
    clean: 'merc --clean',
    precommit: 'merc --test',
    predeploy: 'merc --test',
  });

  utils.packageJSON.scripts = packageJsonScripts;

  fs.writeFileSync(
    `${cwd}/package.json`,
    JSON.stringify(utils.packageJSON, null, 2)
  );
};

const copyBoilerplateDeps = () => {
  const templatesPackageJson = utils.readFileSync(`${templatesDir}/package.json`);
  const parsedTemplatesPackageJson = JSON.parse(templatesPackageJson);

  const deps = Object.assign(
    {},
    utils.packageJSON.dependencies,
    parsedTemplatesPackageJson.dependencies
  );

  const orderedDeps = {};
  Object.keys(deps).sort().forEach((key) => {
    orderedDeps[key] = deps[key];
  });

  utils.packageJSON.dependencies = orderedDeps;

  fs.writeFileSync(
    `${cwd}/package.json`,
    JSON.stringify(utils.packageJSON, null, 2)
  );

  console.log('Installing starter kit dependencies...');
  console.log();

  install();
};

const setup = () => {
  copyTemplates();
  copyNpmScripts();
  copyBoilerplateDeps();

  const paths = cwd.split('/');
  const appName = paths[paths.length - 1];
  const appPath = cwd.replace(`/${appName}`, '');

  console.log(`
    Success! Mercenary created ${chalk.green(appName)} at ${chalk.green(appPath)}
    Inside that directory, you can run several commands:

      ${chalk.cyan('npm start')}
        Start the development server.

      ${chalk.cyan('npm test')}
        Run unit tests.

      ${chalk.cyan('npm run test:watch')}
        Start the unit test watcher.

      ${chalk.cyan('npm run e2e')}
        Run end-to-end tests.

      ${chalk.cyan('npm run prod')}
        Build the client and start the production server.

      ${chalk.cyan('npm run deploy')}
        Deploy the Dockerized application to ElasticBeanstalk.

      ${chalk.cyan('npm run deploy:init')}
        Configure an AWS account for the deploy task.


    But first, you should run:

      ${chalk.cyan(`cd ${appName}`)}

  `);
};

module.exports = setup;
