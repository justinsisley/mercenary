const path = require('path');
const cp = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const install = require('./install');

const cwd = process.cwd();
const packageDirectory = path.join(__dirname, '..');
const templatesDir = path.join(packageDirectory, '/templates');

const readFile = filepath => fs.readFileSync(filepath, { encoding: 'utf8' });

// Host project's package.json
const packageJson = readFile(`${cwd}/package.json`);
const parsedPackageJson = JSON.parse(packageJson);

const copyTemplates = () => {
  // Files
  cp.execSync(`cp "${templatesDir}/.babelrc" "${cwd}/.babelrc"`);
  cp.execSync(`cp "${templatesDir}/.eslintrc" "${cwd}/.eslintrc"`);
  cp.execSync(`cp "${templatesDir}/gitignore" "${cwd}/.gitignore"`);
  cp.execSync(`cp "${templatesDir}/config.js" "${cwd}/config.js"`);

  // Directories
  cp.execSync(`cp -R "${templatesDir}/client" "${cwd}/client"`);
  cp.execSync(`cp -R "${templatesDir}/server" "${cwd}/server"`);
  cp.execSync(`cp -R "${templatesDir}/email" "${cwd}/email"`);

  // Write customized readme.md
  const readme = readFile(`${templatesDir}/readme.md`);
  const modifiedReadme = readme.replace('{name}', parsedPackageJson.name);
  fs.writeFileSync(`${cwd}/readme.md`, modifiedReadme);
};

const copyNpmScripts = () => {
  const packageJsonScripts = Object.assign({}, parsedPackageJson.scripts, {
    start: 'merc --start',
    test: 'merc --test',
    'test:watch': 'merc --testWatch',
    e2e: 'merc --e2e',
    build: 'merc --build',
    prod: 'merc --prod',
    deploy: 'merc --deploy',
    'deploy:init': 'merc --deployInit',
  });

  parsedPackageJson.scripts = packageJsonScripts;

  fs.writeFileSync(
    `${cwd}/package.json`,
    JSON.stringify(parsedPackageJson, null, 2)
  );
};

const copyBoilerplateDeps = () => {
  const templatesPackageJson = readFile(`${templatesDir}/package.json`);
  const parsedTemplatesPackageJson = JSON.parse(templatesPackageJson);

  const deps = Object.assign(
    {},
    parsedPackageJson.dependencies,
    parsedTemplatesPackageJson.dependencies
  );

  const orderedDeps = {};
  Object.keys(deps).sort().forEach((key) => {
    orderedDeps[key] = deps[key];
  });

  parsedPackageJson.dependencies = orderedDeps;

  fs.writeFileSync(
    `${cwd}/package.json`,
    JSON.stringify(parsedPackageJson, null, 2)
  );

  console.log('Installing boilerplate packages...');
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
