const path = require('path');
const cp = require('child_process');
const fs = require('fs');
const chalk = require('chalk');
const install = require('./install');

const cwd = process.cwd();
const templatesDir = path.join(__dirname, '../templates');

const readFile = filepath => fs.readFileSync(filepath, { encoding: 'utf8' });

// Set up npm scripts
const npmScripts = () => {
  const packageJson = readFile(`${cwd}/package.json`);
  const parsedPackageJson = JSON.parse(packageJson);
  const packageJsonScripts = Object.assign({}, parsedPackageJson.scripts, {
    start: 'merc --start',
    prod: 'merc --prod',
    build: 'merc --build',
    test: 'merc --test',
    testwatch: 'merc --testWatch',
    e2e: 'merc --e2e',
    docker: 'merc --docker',
    clean: 'merc --clean',
  });

  parsedPackageJson.scripts = packageJsonScripts;

  fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(parsedPackageJson, null, 2));
};

// Set up npm dependencies for the boilerplate
const npmDeps = () => {
  const templatesPackageJson = readFile(`${templatesDir}/package.json`);
  const parsedTemplatesPackageJson = JSON.parse(templatesPackageJson);

  const packageJson = readFile(`${cwd}/package.json`);
  const parsedPackageJson = JSON.parse(packageJson);
  const packageJsonDeps = Object.assign(
    {},
    parsedPackageJson.dependencies,
    parsedTemplatesPackageJson.dependencies
  );

  parsedPackageJson.dependencies = packageJsonDeps;

  fs.writeFileSync(`${cwd}/package.json`, JSON.stringify(parsedPackageJson, null, 2));

  console.log('Installing boilerplate packages...');
  console.log();

  install();
};

// Basic project setup
const setup = () => {
  cp.execSync(`cp "${templatesDir}/gitignore" "${cwd}/.gitignore"`);
  cp.execSync(`cp "${templatesDir}/readme.md" "${cwd}/readme.md"`);
  cp.execSync(`cp "${templatesDir}/config.js" "${cwd}/config.js"`);
  cp.execSync(`cp -R "${templatesDir}/client" "${cwd}/client"`);
  cp.execSync(`cp -R "${templatesDir}/server" "${cwd}/server"`);

  npmScripts();
  npmDeps();

  const paths = cwd.split('/');
  const appName = paths[paths.length - 1];
  const appPath = cwd.replace(`/${appName}`, '');

  console.log(`Success! Created ${chalk.green(appName)} at ${chalk.green(appPath)}`);
  console.log('Inside that directory, you can run several commands:');
  console.log();
  console.log(chalk.cyan('  npm start'));
  console.log('    Starts the development server.');
  console.log();
  console.log(chalk.cyan('  npm run build'));
  console.log('    Bundles the app into static files for production.');
  console.log();
  console.log(chalk.cyan('  npm test'));
  console.log('    Starts the test runner.');
  console.log();
};

module.exports = setup;
