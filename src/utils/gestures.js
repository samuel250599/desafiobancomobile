/**
 * Gestures Utility
 * Contains touch gesture methods for mobile interactions
 */
const { join } = require('path');

class Gestures {
  /**
   * Swipe left on element
   */
  static async swipeLeft(element) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const startY = location.y + size.height / 2;
    const startX = location.x + size.width * 0.9;
    const endX = location.x + size.width * 0.1;

    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: endX, y: startY } },
      { action: 'release' },
    ]);
  }

  /**
   * Swipe right on element
   */
  static async swipeRight(element) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const startY = location.y + size.height / 2;
    const startX = location.x + size.width * 0.1;
    const endX = location.x + size.width * 0.9;

    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: endX, y: startY } },
      { action: 'release' },
    ]);
  }

  /**
   * Swipe up on element
   */
  static async swipeUp(element) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const startX = location.x + size.width / 2;
    const startY = location.y + size.height * 0.9;
    const endY = location.y + size.height * 0.1;

    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: startX, y: endY } },
      { action: 'release' },
    ]);
  }

  /**
   * Swipe down on element
   */
  static async swipeDown(element) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const startX = location.x + size.width / 2;
    const startY = location.y + size.height * 0.1;
    const endY = location.y + size.height * 0.9;

    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: startX, y: endY } },
      { action: 'release' },
    ]);
  }

  /**
   * Tap on element at position
   */
  static async tapAt(x, y) {
    await driver.touchPerform([
      { action: 'press', options: { x, y } },
      { action: 'release' },
    ]);
  }

  /**
   * Double tap on element
   */
  static async doubleTap(element) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const centerX = location.x + size.width / 2;
    const centerY = location.y + size.height / 2;

    await driver.touchPerform([
      { action: 'press', options: { x: centerX, y: centerY } },
      { action: 'release' },
      { action: 'press', options: { x: centerX, y: centerY } },
      { action: 'release' },
    ]);
  }

  /**
   * Long press on element
   */
  static async longPress(element, duration = 1000) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const centerX = location.x + size.width / 2;
    const centerY = location.y + size.height / 2;

    await driver.touchPerform([
      { action: 'press', options: { x: centerX, y: centerY } },
      { action: 'wait', options: { ms: duration } },
      { action: 'release' },
    ]);
  }

  /**
   * Drag element to specific coordinates
   */
  static async dragTo(element, targetX, targetY) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const startX = location.x + size.width / 2;
    const startY = location.y + size.height / 2;

    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: targetX - startX, y: targetY - startY } },
      { action: 'wait', options: { ms: 300 } },
      { action: 'release' },
    ]);
  }

  /**
   * Drag element by offset
   */
  static async dragByOffset(element, xOffset, yOffset) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const startX = location.x + size.width / 2;
    const startY = location.y + size.height / 2;

    await driver.touchPerform([
      { action: 'press', options: { x: startX, y: startY } },
      { action: 'wait', options: { ms: 500 } },
      { action: 'moveTo', options: { x: xOffset, y: yOffset } },
      { action: 'wait', options: { ms: 300 } },
      { action: 'release' },
    ]);
  }

  /**
   * Pinch on element (zoom out)
   */
  static async pinch(element) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const centerX = location.x + size.width / 2;
    const centerY = location.y + size.height / 2;

    // Simulate pinch with two finger touch actions
    await driver.touchPerform([
      { action: 'press', options: { x: centerX - 50, y: centerY } },
      { action: 'moveTo', options: { x: 50, y: 0 } },
      { action: 'release' },
    ]);

    await driver.touchPerform([
      { action: 'press', options: { x: centerX + 50, y: centerY } },
      { action: 'moveTo', options: { x: -50, y: 0 } },
      { action: 'release' },
    ]);
  }

  /**
   * Zoom on element (zoom in)
   */
  static async zoom(element) {
    const location = await element.getLocation();
    const size = await element.getSize();

    const centerX = location.x + size.width / 2;
    const centerY = location.y + size.height / 2;

    // Simulate zoom with two finger touch actions
    await driver.touchPerform([
      { action: 'press', options: { x: centerX, y: centerY } },
      { action: 'moveTo', options: { x: -100, y: 0 } },
      { action: 'release' },
    ]);

    await driver.touchPerform([
      { action: 'press', options: { x: centerX, y: centerY } },
      { action: 'moveTo', options: { x: 100, y: 0 } },
      { action: 'release' },
    ]);
  }

  /**
   * Scroll to element (for Android)
   */
  static async scrollToElement(selector) {
    const element = await $(selector);
    await element.scrollIntoView();
  }

  /**
   * Swipe until element is visible
   */
  static async swipeUntilVisible(containerSelector, targetSelector, direction = 'up', maxSwipes = 5) {
    const container = await $(containerSelector);
    let isVisible = false;
    let swipes = 0;

    while (!isVisible && swipes < maxSwipes) {
      isVisible = await (await $(targetSelector)).isDisplayed();

      if (!isVisible) {
        switch (direction) {
          case 'up':
            await this.swipeUp(container);
            break;
          case 'down':
            await this.swipeDown(container);
            break;
          case 'left':
            await this.swipeLeft(container);
            break;
          case 'right':
            await this.swipeRight(container);
            break;
        }
        swipes++;
        await driver.pause(500);
      }
    }

    return isVisible;
  }
}

module.exports = Gestures;