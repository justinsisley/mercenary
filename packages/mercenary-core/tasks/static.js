const join = require('path').join;
const cp = require('child_process');
const fs = require('fs');
const chrome = require('chrome-location');

const cwd = process.cwd();

const staticPaths = require(join(cwd, 'config.js')).staticPaths;
const destination = join(cwd, '/public/static');

const args = '--headless --disable-gpu --dump-dom';
const host = 'http://localhost:3325';
const command = `"${chrome}" ${args} ${host}`;

const buildStatic = () => {
  if (staticPaths && staticPaths.length) {
    const baseHTML = fs.readFileSync('./public/index.html', { encoding: 'utf8' });

    fs.mkdirSync(destination);

    staticPaths.forEach((path) => {
      const rendered = cp.execSync(`${command}${path}`).toString();
      const page = baseHTML.replace(/<body>([\s\S]*)<\/body>/, rendered);

      let name = path.replace('/', '');
      if (!name) { name = 'index'; }

      fs.writeFileSync(join(destination, `/${name}.html`), page);
    });
  }
};

module.exports = buildStatic;
