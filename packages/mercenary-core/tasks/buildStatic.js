const join = require('path').join;
const fs = require('fs');
const Chromy = require('chromy');

const cwd = process.cwd();

const staticPaths = require(join(cwd, 'config.js')).static;
const destination = join(cwd, '/public/static');

const host = 'http://localhost:3325';
let chromePort = 9222;

async function renderPage(path) {
  const chromy = new Chromy({ port: chromePort += 1 });
  await chromy.goto(`${host}${path}`);

  const html = await chromy.evaluate(() => {
    // const headScripts = document.head.getElementsByTagName('script');
    //
    // for (let i = 0; i < headScripts.length; i += 1) {
    //   headScripts[i].parentNode.removeChild(headScripts[i]);
    // }

    return document.documentElement.outerHTML;
  });

  await chromy.close();

  return { path, html };
}

async function buildStatic() {
  if (staticPaths && staticPaths.length) {
    fs.mkdirSync(destination);

    const renderedPages = await Promise.all(staticPaths.map(await renderPage));

    renderedPages.forEach(({ path, html }) => {
      let name = path.replace('/', '');
      if (!name) { name = 'index'; }

      fs.writeFileSync(join(destination, `/${name}.html`), `<!DOCTYPE html>\n${html}`);
    });
  }
}

module.exports = buildStatic;
