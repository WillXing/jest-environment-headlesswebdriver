const NodeEnvironment = require('jest-environment-node');
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    const options = config.testEnvironmentOptions || {};
    this.headlessMode = options.headlessMode || false;
    this.browserName = options.browser || 'chrome';
    this.seleniumAddress = options.seleniumAddress || null;
  }

  async setup() {
    await super.setup();

    this.driver = await this.generateDriverWithOption();

    this.global.by = By;
    this.global.browser = this.driver;
    this.global.element = locator => this.driver.findElement(locator);
    this.global.element.all = locator => this.driver.findElements(locator);
    this.global.until = until;
  }

  async generateDriverWithOption() {
    let driver = new Builder();
    
    if (this.seleniumAddress) {
      driver = driver.usingServer(this.seleniumAddress);
    }

    let browser = driver.forBrowser(this.browserName);
    let browserWithOption;

    switch (this.browserName) {
      case 'chrome':
        browserWithOption = browser.setChromeOptions(this.headlessMode ? new chrome.Options().headless() : null);
        break;
      default:
        browserWithOption = browser;
    }
    return await browserWithOption.build();
  }

  async teardown() {
    await this.driver.quit();
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;

