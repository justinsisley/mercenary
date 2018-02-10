/* eslint-disable import/no-unresolved */
const join = require('path').join;
const fs = require('fs');
const puppeteer = require('puppeteer');
const minify = require('html-minifier').minify;
const config = require('../config');
const utils = require('../utils');

const cwd = process.cwd();

const staticPaths = config.static;
const destination = join(cwd, '/public/pages');

const host = 'http://localhost:3325';

async function renderPage(path) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(`${host}${path}`);

  let html = await page.evaluate(() => {
    // We need to move all JavaScript in the head of the document to the body.
    // This prevents errors related to static rendering async routes, which
    // are injected into the head of the document dynamically. When the page
    // is statically rendered, this means the async route is loaded before the
    // main JavaScript bundle.
    const headScripts = Array.prototype.slice.call(
      document.head.getElementsByTagName('script')
    );

    for (let i = 0; i < headScripts.length; i += 1) {
      const removedScript = headScripts[i].parentNode.removeChild(headScripts[i]);

      document.body.appendChild(removedScript);
    }

    let scriptTagText = '';
    let state;

    if (window.staticState) {
      state = window.staticState();
    }

    if (state && Object.keys(state).length !== 0) {
      scriptTagText += Object.keys(state).map((key) => {
        const json = utils.escapeJSON(state[key]);

        return `window["${key}"]=${json};`;
      }).join('');
    }

    if (scriptTagText !== '') {
      const scriptTag = document.createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.text = scriptTagText;

      const firstScript = Array.from(document.scripts)[0];
      firstScript.parentNode.insertBefore(scriptTag, firstScript);
    }

    return document.documentElement.outerHTML;
  });

  await browser.close();

  // Remove STATIC_RENDER boolean from the final code
  html = html.replace('<script>window.STATIC_RENDER = true;</script>', '');

  return { path, html };
}

async function buildStatic() {
  if (staticPaths && staticPaths.length) {
    fs.mkdirSync(destination);

    const renderedPages = await Promise.all(staticPaths.map(await renderPage));

    renderedPages.forEach(({ path, html }) => {
      let name = path.replace('/', '');
      if (!name) { name = 'index'; }

      // Minify the HTML
      const minified = minify(`<!DOCTYPE html>${html}`, {
        minifyCSS: true,
        minifyJS: true,
        collapseWhitespace: true,
      });

      fs.writeFileSync(join(destination, `/${name}.html`), minified);
    });
  }
}

module.exports = buildStatic;
