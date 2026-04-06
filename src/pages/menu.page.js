const BasePage = require('./base.page');

/**
 * Menu Page Object
 * Handles side panel menu navigation
 */
class MenuPage extends BasePage {
  constructor() {
    super();
    // Menu button and panel
    this.menuButton = '~open menu';
    this.menuPanel = '~menu-panel';
    this.closeMenuButton = '~close menu';

    // Menu items
    this.menuHome = '~menu-item-home';
    this.menuWebView = '~menu-item-webview';
    this.menuLogin = '~menu-item-login';
    this.menuForms = '~menu-item-forms';
    this.menuSwipe = '~menu-item-swipe';
    this.menuDrag = '~menu-item-drag';

    // Tab bar visibility toggle
    this.tabBarToggle = '~tab-bar-toggle';

    // Alternative selectors
    this.menuButtonAlt = '//android.widget.Button[@content-desc="open menu"]|//XCUIElementTypeButton[@name="open menu"]';
    this.menuPanelAlt = '//android.view.ViewGroup[@content-desc="menu-panel"]|//XCUIElementTypeGroup[@name="menu-panel"]';
  }

  /**
   * Open menu panel
   */
  async openMenu() {
    await this.clickElement(this.menuButton);
    await this.pause(500);
  }

  /**
   * Close menu panel
   */
  async closeMenu() {
    await this.clickElement(this.closeMenuButton);
    await this.pause(500);
  }

  /**
   * Check if menu is open
   */
  async isMenuOpen() {
    return this.isElementDisplayed(this.menuPanel);
  }

  /**
   * Navigate to Home via menu
   */
  async goToHome() {
    await this.openMenu();
    await this.clickElement(this.menuHome);
    await this.closeMenu();
  }

  /**
   * Navigate to WebView via menu
   */
  async goToWebView() {
    await this.openMenu();
    await this.clickElement(this.menuWebView);
    await this.closeMenu();
  }

  /**
   * Navigate to Login via menu
   */
  async goToLogin() {
    await this.openMenu();
    await this.clickElement(this.menuLogin);
    await this.closeMenu();
  }

  /**
   * Navigate to Forms via menu
   */
  async goToForms() {
    await this.openMenu();
    await this.clickElement(this.menuForms);
    await this.closeMenu();
  }

  /**
   * Navigate to Swipe via menu
   */
  async goToSwipe() {
    await this.openMenu();
    await this.clickElement(this.menuSwipe);
    await this.closeMenu();
  }

  /**
   * Navigate to Drag via menu
   */
  async goToDrag() {
    await this.openMenu();
    await this.clickElement(this.menuDrag);
    await this.closeMenu();
  }

  /**
   * Toggle tab bar visibility
   */
  async toggleTabBar() {
    await this.clickElement(this.tabBarToggle);
  }

  /**
   * Get all menu items
   */
  async getAllMenuItems() {
    const items = [
      { name: 'Home', selector: this.menuHome },
      { name: 'WebView', selector: this.menuWebView },
      { name: 'Login', selector: this.menuLogin },
      { name: 'Forms', selector: this.menuForms },
      { name: 'Swipe', selector: this.menuSwipe },
      { name: 'Drag', selector: this.menuDrag },
    ];

    const menuItems = [];
    for (const item of items) {
      const isDisplayed = await this.isElementDisplayed(item.selector);
      if (isDisplayed) {
        menuItems.push({ name: item.name, displayed: true });
      }
    }
    return menuItems;
  }

  /**
   * Verify menu navigation works
   */
  async verifyMenuNavigation(itemName) {
    await this.openMenu();
    const isVisible = await this.isMenuOpen();
    await this.closeMenu();
    return isVisible;
  }
}

module.exports = new MenuPage();