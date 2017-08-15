const formSelector = '#root > div > div > div > div';

module.exports = {
  'Page title is accurate': function test(browser) {
    browser.url('http://localhost:3325/login')
    .waitForElementVisible('body', 1000)
    .assert.title('Login')
    .end();
  },

  'Login form is visible': function test(browser) {
    browser.url('http://localhost:3325/login')
    .waitForElementVisible(formSelector, 1000)
    .assert.visible(formSelector)
    .end();
  },
};
