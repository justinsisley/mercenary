# Setting up your development environment on OS X 10.8.3
- [Install Homebrew](http://mxcl.github.io/homebrew/)
- Install Node.js and NPM: `brew install node`
- Install Grunt, Bower, Nodemon and Forever: `npm install -g grunt-cli; npm install -g bower; npm install -g nodemon; npm install -g forever`
  - [Learn about Grunt](http://gruntjs.com/)
  - [Learn about Bower](http://bower.io/)
  - [Learn about Nodemon](http://remy.github.io/nodemon/)
  - [Learn about Forever](https://github.com/nodejitsu/forever)
- Install dependencies: `npm install; bower install`
- Install Mocha: `npm install -g mocha`
- Install PhantomJS and Mocha-Phantom: `npm install -g mocha-phantomjs phantomjs`
- Run `grunt` for good measure
- Start the local server: `grunt server`
- In another terminal window, run `grunt watch`
- Visit <http://localhost:8743>

# Managing dependencies
- Use bower.json to edit, update and declare new client-side dependencies.
- Use package.json to edit, update and declare new server-side dependencies.
  - Put development dependencies under "devDependencies".
- Use proper version numbers for dependencies
  - Avoid using wild card (*) versions
  - If you don't know the latest version, use a wild card, then get the proper version number from the dependency's package file
- If a dependency is not available via Bower, manually import it into the project within the `vendor/_nonBower` directory,
and keep a clean, organized directory structure.
- When doing "house cleaning", delete all vendor sub-directories except `_nonBower`, then re-install Bower dependencies.

# Things to know before you start making changes
- `package.json` contains 3 properties that are managed via a custom Grunt task. Don't change them. These 3 properties are:
  - revisionJS
  - revisionCSS
  - revisionCSSfont
    - Making icon font edits is easy, but slightly convoluted. Improvements are welcome and changes should be well documented.
      - New icon font symbols are created using [IcoMoon](http://icomoon.io/app/) and are added to the existing set.
      - Import the existing set into IcoMoon, add your new symbols, then download the updated icon font.
      - Click the icon that resembles a database symbol, then click "Store Session" to download a JSON file that contains the data for the icon font. Rename this file to "session.json" (as mundane as this sounds, it's important).
      - Open the zip file containing the icon font. You should see a `fonts` directory, and a file called `style.css`.
        - Rename `style.css` to `fonts.css`
        - Copy both `style.css` and the `fonts` directory to `/client/css/`
          - Let the new `style.css` overwrite the old one
          - Delete the versioned `fonts` directory. It will have a format like `fonts-##`, where the hashes represent the previous icon font version. Basically, you only want to check in the newest version.
          - After pushing your changes, be sure to run `grunt cdn` to update the version numbers and make edits to the appropriate font files and `fonts` directory, then send everything to S3.
      - Put the JSON session file in the newly added `/client/css/fonts` directory.
- CDN pushes (to Amazon S3) happen automatically upon pushing changes to a repository. Unless something changes, CDN pushes should remain fully-automated.

# Browser Support
This application is built with modern web technologies at its core. Targeted browsers and versions are:
- Chrome 27+
- Firefox 20+
- Safari 6+
- Opera 12+
- Internet Explorer 10+

# Writing Tests
- Views
  - Check the tag type property
  - Check the class name property
  - Check that it renders to the DOM
  - Check that it produces the correct markup
  - Check that the generated markup contains the right data
  - Check any callable methods