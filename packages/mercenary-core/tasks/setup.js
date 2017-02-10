const path = require('path');
const cp = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const install = require('./install');

const cwd = process.cwd();
const packageDirectory = path.join(__dirname, '..');
const templatesDir = path.join(packageDirectory, '/templates');

const readFile = filepath => fs.readFileSync(filepath, { encoding: 'utf8' });

const copyTemplates = () => {
  // Files
  cp.execSync(`cp "${packageDirectory}/.babelrc" "${cwd}/.babelrc"`);
  cp.execSync(`cp "${packageDirectory}/.eslintrc" "${cwd}/.eslintrc"`);
  cp.execSync(`cp "${templatesDir}/gitignore" "${cwd}/.gitignore"`);
  cp.execSync(`cp "${templatesDir}/readme.md" "${cwd}/readme.md"`);
  cp.execSync(`cp "${templatesDir}/config.js" "${cwd}/config.js"`);
  cp.execSync(`cp "${templatesDir}/deploy.js" "${cwd}/deploy.js"`);

  // Directories
  cp.execSync(`cp -R "${templatesDir}/client" "${cwd}/client"`);
  cp.execSync(`cp -R "${templatesDir}/server" "${cwd}/server"`);
};

const copyNpmScripts = () => {
  const packageJson = readFile(`${cwd}/package.json`);
  const parsedPackageJson = JSON.parse(packageJson);
  const packageJsonScripts = Object.assign({}, parsedPackageJson.scripts, {
    start: 'merc --start',
    test: 'merc --test',
    testwatch: 'merc --testWatch',
    e2e: 'merc --e2e',
    prod: 'merc --prod',
    deploy: 'merc --deploy',
    clean: 'merc --clean',
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

  const packageJson = readFile(`${cwd}/package.json`);
  const parsedPackageJson = JSON.parse(packageJson);

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
        Starts the development server.

      ${chalk.cyan('npm test')}
        Runs unit tests.

      ${chalk.cyan('npm run testwatch')}
        Starts the unit test watcher.

      ${chalk.cyan('npm run e2e')}
        Runs end-to-end tests.

      ${chalk.cyan('npm run prod')}
        Builds the client and starts the production server.

      ${chalk.cyan('npm run deploy')}
        Deploy application to ElasticBeanstalk.

      ${chalk.cyan('npm run clean')}
        Delete build and test artifacts.


    But first, you should run:

      ${chalk.cyan(`cd ${appName}`)}

  `);
};

module.exports = setup;
