const BasePage = require('./base.page');

/**
 * WebView Page Object
 * Handles WebView context switching
 */
class WebViewPage extends BasePage {
  constructor() {
    super();
    // Tab selector
    this.webViewTab = '~tab-bar-option-webview';
    this.webViewScreen = '~Webview-screen';

    // WebView elements
    this.webViewUrlInput = '~url-input';
    this.webViewGoButton = '~button-Go';
    this.webViewContent = '~webView';

    // Alternative selectors
    this.webViewElement = '//android.webkit.WebView|//XCUIElementTypeWebView';
    this.pageSource = 'body';
  }

  /**
   * Navigate to WebView screen
   */
  async goToWebView() {
    await this.clickElement(this.webViewTab);
    await this.waitForElement(this.webViewScreen);
  }

  /**
   * Enter URL in input field
   */
  async enterUrl(url) {
    await this.setValue(this.webViewUrlInput, url);
  }

  /**
   * Click Go button
   */
  async clickGo() {
    await this.clickElement(this.webViewGoButton);
  }

  /**
   * Navigate to URL
   */
  async navigateToUrl(url) {
    await this.enterUrl(url);
    await this.clickGo();
    await this.pause(3000); // Wait for page to load
  }

  /**
   * Switch to WebView context
   */
  async switchToWebViewContext() {
    await this.pause(2000);
    const contexts = await driver.getContexts();
    console.log('Available contexts:', contexts);

    const webviewContext = contexts.find((ctx) => ctx.includes('WEBVIEW'));
    if (webviewContext) {
      await driver.switchContext(webviewContext);
      console.log('Switched to context:', webviewContext);
      return true;
    }
    return false;
  }

  /**
   * Switch to Native context
   */
  async switchToNativeContext() {
    await driver.switchContext('NATIVE_APP');
    console.log('Switched to NATIVE_APP context');
  }

  /**
   * Get current context
   */
  async getCurrentContext() {
    return driver.getContext();
  }

  /**
   * Check if in WebView context
   */
  async isInWebViewContext() {
    const context = await driver.getContext();
    return context.includes('WEBVIEW');
  }

  /**
   * Verify WebView is loaded
   */
  async isWebViewLoaded() {
    await this.pause(3000);
    return this.isElementDisplayed(this.webViewContent);
  }

  /**
   * Get WebView page title
   */
  async getWebViewTitle() {
    const isInWeb = await this.switchToWebViewContext();
    if (isInWeb) {
      try {
        const title = await driver.getTitle();
        await this.switchToNativeContext();
        return title;
      } catch (error) {
        await this.switchToNativeContext();
        return null;
      }
    }
    return null;
  }

  /**
   * Verify context switching works
   */
  async verifyContextSwitching() {
    const initialContext = await driver.getContext();

    // Switch to WebView
    const switchedToWeb = await this.switchToWebViewContext();
    if (!switchedToWeb) {
      return { success: false, message: 'Could not switch to WebView context' };
    }

    const webContext = await driver.getContext();

    // Switch back to Native
    await this.switchToNativeContext();
    const nativeContext = await driver.getContext();

    return {
      success: true,
      initialContext,
      webContext,
      nativeContext,
    };
  }

  /**
   * Wait for WebView page to load
   */
  async waitForWebViewPageToLoad() {
    await this.waitForElement(this.webViewTab);
    await this.clickElement(this.webViewTab);
    await this.waitForElement(this.webViewScreen);
  }
}

module.exports = new WebViewPage();