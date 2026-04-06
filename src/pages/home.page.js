const BasePage = require('./base.page');

/**
 * Home Page Object
 * Represents the main landing screen of the app
 */
class HomePage extends BasePage {
  constructor() {
    super();
    // Selectors based on accessibility/testID patterns
    this.tabBar = '~tab-bar';
    this.homeTab = '~tab-bar-option-home';
    this.webViewTab = '~tab-bar-option-webview';
    this.loginTab = '~tab-bar-option-login';
    this.formsTab = '~tab-bar-option-forms';
    this.swipeTab = '~tab-bar-option-swipe';
    this.dragTab = '~tab-bar-option-drag';

    // Alternative selectors for React Native elements
    this.homeTitle = '//android.widget.TextView[@text="Home"]|//XCUIElementTypeStaticTensor[@name="Home"]';
    this.welcomeMessage = '//android.widget.TextView[contains(@text, "Welcome")]|//XCUIElementTypeStaticTensor[@name="Welcome"]';
  }

  /**
   * Navigate to Home tab
   */
  async goToHome() {
    await this.clickElement(this.homeTab);
  }

  /**
   * Navigate to WebView tab
   */
  async goToWebView() {
    await this.clickElement(this.webViewTab);
  }

  /**
   * Navigate to Login tab
   */
  async goToLogin() {
    await this.clickElement(this.loginTab);
  }

  /**
   * Navigate to Forms tab
   */
  async goToForms() {
    await this.clickElement(this.formsTab);
  }

  /**
   * Navigate to Swipe tab
   */
  async goToSwipe() {
    await this.clickElement(this.swipeTab);
  }

  /**
   * Navigate to Drag tab
   */
  async goToDrag() {
    await this.clickElement(this.dragTab);
  }

  /**
   * Check if Home page is displayed
   */
  async isHomePageDisplayed() {
    return this.isElementDisplayed(this.homeTab);
  }

  /**
   * Get all tab elements
   */
  async getAllTabs() {
    const tabs = [
      this.homeTab,
      this.webViewTab,
      this.loginTab,
      this.formsTab,
      this.swipeTab,
      this.dragTab,
    ];

    const tabElements = [];
    for (const tab of tabs) {
      const isDisplayed = await this.isElementDisplayed(tab);
      if (isDisplayed) {
        const text = await this.getElementText(tab);
        tabElements.push({ selector: tab, text, displayed: true });
      }
    }
    return tabElements;
  }

  /**
   * Wait for Home page to load
   */
  async waitForHomePageToLoad() {
    await this.waitForElement(this.tabBar);
    await this.waitForElement(this.homeTab);
  }
}

module.exports = new HomePage();