const NodeEnvironment = require("jest-environment-node");
const { Builder, By, until } = require("selenium-webdriver");
const chrome = require("selenium-webdriver/chrome");
const firefox = require("selenium-webdriver/firefox");
const ie = require("selenium-webdriver/ie");
const edge = require("selenium-webdriver/edge");

class WebDriverEnvironment extends NodeEnvironment {
  constructor(config) {
    super(config);
    const options = config.testEnvironmentOptions || {};
    this.chromeArgs = options.chromeArgs || null;
    this.firefoxArgs = options.firefoxArgs || null;
    this.ieArgs = options.ieArgs || null;
    this.edgeArgs = options.edgeArgs || null;
    this.browserName = options.browser || "chrome";
    this.seleniumAddress = options.seleniumAddress || null;
  }

  async setup() {
    await super.setup();

    this.driver = await this.generateDriverWithOption();

    this.global.by = By;
    this.global.browser = this.driver;
    this.global.element = (locator) => this.driver.findElement(locator);
    this.global.element.all = (locator) => this.driver.findElements(locator);
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
      case "chrome":
        browserWithOption = browser.setChromeOptions(
          new chrome.Options().addArguments(this.chromeArgs)
        );
        break;
      case "firefox":
        browserWithOption = browser.setFirefoxOptions(
          new firefox.Options().addArguments(this.firefoxArgs)
        );
        break;
      case "ie":
        browserWithOption = browser.setIeOptions(
          new ie.Options().addArguments(this.ieArgs)
        );
        break;
      case "edge":
        browserWithOption = browser.setEdgeOptions(
          new edge.Options().addArguments(this.edgeArgs)
        );
        break;
      default:
        browserWithOption = browser;
    }
    return await browserWithOption.build();
  }

  async teardown() {
    if (this.driver) await this.driver.quit();
    await super.teardown();
  }
}

module.exports = WebDriverEnvironment;
