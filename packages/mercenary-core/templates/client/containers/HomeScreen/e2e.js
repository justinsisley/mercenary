const formSelector = '#root > div > div > form';
const inputSelector = '#input-user-id > input[type="text"]';
const buttonSelector = '#root > div > div > form > div:nth-child(2) > button';
const cardSelector = '#root > div > div > div';
const cardImageSelector = '#root > div > div > div > img';
const cardHeaderSelector = '#root > div > div > div > div:nth-child(2) > div.header';
const cardMetaSelector = '#root > div > div > div > div:nth-child(2) > div.meta';
const cardDescriptionSelector = '#root > div > div > div > div:nth-child(2) > div.description';
const cardLinkSelector = '#root > div > div > div > div:nth-child(3) > a';

const userId = '1';

module.exports = {
  'Page title is accurate': function test(browser) {
    browser.url('http://localhost:3325')
    .waitForElementVisible('body', 1000)
    .assert.title('Mercenary | Home')
    .end();
  },

  'UserForm is visible': function test(browser) {
    browser.url('http://localhost:3325')
    .waitForElementVisible(formSelector, 1000)
    .assert.visible(formSelector)
    .end();
  },

  'Input accepts a value': function test(browser) {
    browser.url('http://localhost:3325')
    .waitForElementVisible(formSelector, 1000)
    .setValue(inputSelector, userId)
    .assert.value(inputSelector, userId)
    .end();
  },

  'Button displays loading indicator when clicked': function test(browser) {
    browser.url('http://localhost:3325')
    .waitForElementVisible(formSelector, 1000)
    .setValue(inputSelector, userId)
    .click(buttonSelector)
    .assert.cssClassPresent(buttonSelector, 'loading')
    .end();
  },

  'Renders a card when the button is clicked': function test(browser) {
    browser.url('http://localhost:3325')
    .waitForElementVisible(formSelector, 1000)
    .setValue(inputSelector, userId)
    .click(buttonSelector)
    .waitForElementVisible(cardSelector, 1000)
    .assert.visible(cardImageSelector)
    .assert.visible(cardHeaderSelector)
    .assert.visible(cardMetaSelector)
    .assert.visible(cardDescriptionSelector)
    .assert.visible(cardLinkSelector)
    .end();
  },
};
