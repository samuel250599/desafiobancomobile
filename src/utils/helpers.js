/**
 * Helpers Utility
 * Contains common helper methods for test execution
 */
const { addAttachment } = require('@wdio/allure-reporter').default;

class Helpers {
  /**
   * Generate random string
   */
  static randomString(length = 8) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  /**
   * Generate random email
   */
  static randomEmail(domain = 'test.com') {
    return `test_${this.randomString(8)}@${domain}`;
  }

  /**
   * Generate random number between min and max
   */
  static randomNumber(min = 0, max = 100) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Generate random phone number
   */
  static randomPhone() {
    return `+1${this.randomNumber(1000000000, 9999999999)}`;
  }

  /**
   * Wait for condition with timeout
   */
  static async waitUntil(condition, timeout = 10000, message = 'Condition not met') {
    await browser.waitUntil(condition, { timeout, timeoutMsg: message });
  }

  /**
   * Wait for element and click
   */
  static async waitAndClick(selector, timeout = 10000) {
    const element = await $(selector);
    await element.waitForClickable({ timeout });
    await element.click();
  }

  /**
   * Wait for element and set value
   */
  static async waitAndSetValue(selector, value, timeout = 10000) {
    const element = await $(selector);
    await element.waitForDisplayed({ timeout });
    await element.clearValue();
    await element.setValue(value);
  }

  /**
   * Take screenshot and attach to Allure report
   */
  static async takeScreenshot(name) {
    const screenshot = await driver.takeScreenshot();
    const buffer = Buffer.from(screenshot, 'base64');
    addAttachment(name, buffer, 'image/png');
    return screenshot;
  }

  /**
   * Log step to console and Allure
   */
  static logStep(stepName) {
    console.log(`\n📌 STEP: ${stepName}`);
    const { step } = require('@wdio/allure-reporter').default;
    step(stepName);
  }

  /**
   * Attach text to Allure report
   */
  static attachText(name, content) {
    addAttachment(name, content, 'text/plain');
  }

  /**
   * Attach JSON to Allure report
   */
  static attachJson(name, content) {
    addAttachment(name, JSON.stringify(content, null, 2), 'application/json');
  }

  /**
   * Get device information
   */
  static async getDeviceInfo() {
    const capabilities = driver.capabilities;
    return {
      platformName: capabilities.platformName,
      platformVersion: capabilities.platformVersion,
      deviceName: capabilities.deviceName,
      automationName: capabilities.automationName,
      appPackage: capabilities.appPackage || capabilities.bundleId,
    };
  }

  /**
   * Hide keyboard if visible
   */
  static async hideKeyboard() {
    try {
      const isKeyboardVisible = await driver.isKeyboardShown();
      if (isKeyboardVisible) {
        await driver.hideKeyboard();
      }
    } catch (error) {
      console.log('Could not hide keyboard:', error.message);
    }
  }

  /**
   * Accept alert if present
   */
  static async acceptAlertIfPresent() {
    try {
      await driver.acceptAlert();
    } catch (error) {
      // Alert not present, ignore
    }
  }

  /**
   * Dismiss alert if present
   */
  static async dismissAlertIfPresent() {
    try {
      await driver.dismissAlert();
    } catch (error) {
      // Alert not present, ignore
    }
  }

  /**
   * Check if element exists and is displayed
   */
  static async isElementPresent(selector) {
    try {
      const element = await $(selector);
      return element.isExisting() && element.isDisplayed();
    } catch {
      return false;
    }
  }

  /**
   * Retry action on failure
   */
  static async retry(action, maxRetries = 3, delay = 1000) {
    let lastError;
    for (let i = 0; i < maxRetries; i++) {
      try {
        return await action();
      } catch (error) {
        lastError = error;
        if (i < maxRetries - 1) {
          await driver.pause(delay);
        }
      }
    }
    throw lastError;
  }

  /**
   * Format date for logging
   */
  static formatDate(date = new Date()) {
    return date.toISOString().replace(/[:.]/g, '-');
  }

  /**
   * Sleep utility (use sparingly)
   */
  static async sleep(ms) {
    await driver.pause(ms);
  }

  /**
   * Execute script in context
   */
  static async executeScript(script, args = []) {
    return driver.execute(script, args);
  }

  /**
   * Get current timestamp
   */
  static getTimestamp() {
    return Date.now();
  }

  /**
   * Parse JSON safely
   */
  static safeJsonParse(jsonString, fallback = null) {
    try {
      return JSON.parse(jsonString);
    } catch {
      return fallback;
    }
  }
}

module.exports = Helpers;