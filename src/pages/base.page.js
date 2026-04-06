/**
 * Base Page Object
 * Contains common methods used across all pages
 */
class BasePage {
  constructor() {
    this.timeout = 10000;
    this.shortTimeout = 5000;
  }

  /**
   * Wait for element to be displayed
   */
  async waitForElement(selector, timeout = this.timeout) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    return element;
  }

  /**
   * Wait for element to exist in DOM
   */
  async waitForElementToExist(selector, timeout = this.timeout) {
    const element = await $(selector);
    await element.waitForExist({ timeout });
    return element;
  }

  /**
   * Wait for element to be clickable
   */
  async waitForClickable(selector, timeout = this.timeout) {
    const element = await $(selector);
    await element.waitForClickable({ timeout });
    return element;
  }

  /**
   * Click on element
   */
  async clickElement(selector) {
    const element = await this.waitForClickable(selector);
    await element.click();
  }

  /**
   * Get element text
   */
  async getElementText(selector) {
    const element = await this.waitForElement(selector);
    return element.getText();
  }

  /**
   * Get element value
   */
  async getElementValue(selector) {
    const element = await this.waitForElement(selector);
    return element.getValue();
  }

  /**
   * Set value in input field
   */
  async setValue(selector, value) {
    const element = await this.waitForElement(selector);
    await element.clearValue();
    await element.setValue(value);
  }

  /**
   * Add value to input field (append)
   */
  async addValue(selector, value) {
    const element = await this.waitForElement(selector);
    await element.addValue(value);
  }

  /**
   * Clear input field
   */
  async clearValue(selector) {
    const element = await this.waitForElement(selector);
    await element.clearValue();
  }

  /**
   * Check if element is displayed
   */
  async isElementDisplayed(selector) {
    try {
      const element = await $(selector);
      return await element.isDisplayed();
    } catch {
      return false;
    }
  }

  /**
   * Check if element exists
   */
  async isElementExisting(selector) {
    const element = await $(selector);
    return element.isExisting();
  }

  /**
   * Wait for element to disappear
   */
  async waitForElementToDisappear(selector, timeout = this.timeout) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout, reverse: true });
  }

  /**
   * Get element attribute value
   */
  async getAttribute(selector, attributeName) {
    const element = await this.waitForElement(selector);
    return element.getAttribute(attributeName);
  }

  /**
   * Scroll until element is visible
   */
  async scrollToElement(selector) {
    const element = await $(selector);
    await element.scrollIntoView();
  }

  /**
   * Pause execution (use sparingly)
   */
  async pause(milliseconds) {
    await driver.pause(milliseconds);
  }

  /**
   * Get page source
   */
  async getPageSource() {
    return driver.getPageSource();
  }

  /**
   * Take screenshot
   */
  async takeScreenshot(filename) {
    const timestamp = Date.now();
    const name = filename || `screenshot_${timestamp}`;
    await driver.saveScreenshot(`./allure-results/${name}.png`);
  }

  /**
   * Switch to WebView context
   */
  async switchToWebView() {
    const contexts = await driver.getContexts();
    const webviewContext = contexts.find((ctx) => ctx.includes('WEBVIEW'));
    if (webviewContext) {
      await driver.switchContext(webviewContext);
      return true;
    }
    return false;
  }

  /**
   * Switch to Native context
   */
  async switchToNative() {
    await driver.switchContext('NATIVE_APP');
  }

  /**
   * Get current context
   */
  async getCurrentContext() {
    return driver.getContext();
  }

  /**
   * Get all contexts
   */
  async getAllContexts() {
    return driver.getContexts();
  }
}

module.exports = BasePage;