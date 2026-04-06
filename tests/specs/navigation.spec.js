const { expect } = require('chai');
const HomePage = require('../../src/pages/home.page');
const LoginPage = require('../../src/pages/login.page');
const FormsPage = require('../../src/pages/forms.page');
const SwipePage = require('../../src/pages/swipe.page');
const DragPage = require('../../src/pages/drag.page');
const WebViewPage = require('../../src/pages/webview.page');
const MenuPage = require('../../src/pages/menu.page');
const testData = require('../../src/data/test-data.json');
const { step } = require('@wdio/allure-reporter').default;

describe('Navigation @smoke @regression', () => {
  beforeEach(async () => {
    await HomePage.waitForHomePageToLoad();
  });

  describe('Tab bar navigation @smoke', () => {
    it('should display all main tabs', async () => {
      step('Verify Home tab is displayed');
      expect(await HomePage.isElementDisplayed(HomePage.homeTab)).to.be.true;

      step('Verify WebView tab is displayed');
      expect(await HomePage.isElementDisplayed(HomePage.webViewTab)).to.be.true;

      step('Verify Login tab is displayed');
      expect(await HomePage.isElementDisplayed(HomePage.loginTab)).to.be.true;

      step('Verify Forms tab is displayed');
      expect(await HomePage.isElementDisplayed(HomePage.formsTab)).to.be.true;

      step('Verify Swipe tab is displayed');
      expect(await HomePage.isElementDisplayed(HomePage.swipeTab)).to.be.true;

      step('Verify Drag tab is displayed');
      expect(await HomePage.isElementDisplayed(HomePage.dragTab)).to.be.true;
    });

    it('should navigate between all screens', async () => {
      step('Navigate to Login');
      await HomePage.goToLogin();
      expect(await LoginPage.isElementDisplayed(LoginPage.emailInput)).to.be.true;

      step('Navigate to Forms');
      await HomePage.goToForms();
      expect(await FormsPage.isElementDisplayed(FormsPage.textInput)).to.be.true;

      step('Navigate to Swipe');
      await HomePage.goToSwipe();
      expect(await SwipePage.isCarouselVisible()).to.be.true;

      step('Navigate to Drag');
      await HomePage.goToDrag();
      expect(await DragPage.isElementDisplayed(DragPage.dragContainer)).to.be.true;

      step('Navigate back to Home');
      await HomePage.goToHome();
      expect(await HomePage.isElementDisplayed(HomePage.homeTab)).to.be.true;
    });
  });

  describe('Screen transitions @regression', () => {
    it('should navigate from Home to Login and back', async () => {
      step('Navigate to Login');
      await HomePage.goToLogin();

      step('Verify Login screen');
      expect(await LoginPage.isElementDisplayed(LoginPage.emailInput)).to.be.true;

      step('Navigate back to Home');
      await HomePage.goToHome();

      step('Verify Home screen');
      expect(await HomePage.isElementDisplayed(HomePage.homeTab)).to.be.true;
    });

    it('should navigate from Home to Forms and back', async () => {
      step('Navigate to Forms');
      await HomePage.goToForms();

      step('Verify Forms screen');
      expect(await FormsPage.isElementDisplayed(FormsPage.textInput)).to.be.true;

      step('Navigate back to Home');
      await HomePage.goToHome();

      step('Verify Home screen');
      expect(await HomePage.isElementDisplayed(HomePage.homeTab)).to.be.true;
    });

    it('should navigate through multiple screens sequentially', async () => {
      const screens = [
        { name: 'Login', action: () => HomePage.goToLogin(), verify: () => LoginPage.isElementDisplayed(LoginPage.emailInput) },
        { name: 'Forms', action: () => HomePage.goToForms(), verify: () => FormsPage.isElementDisplayed(FormsPage.textInput) },
        { name: 'Swipe', action: () => HomePage.goToSwipe(), verify: () => SwipePage.isCarouselVisible() },
        { name: 'Drag', action: () => HomePage.goToDrag(), verify: () => DragPage.isElementDisplayed(DragPage.dragContainer) },
      ];

      for (const screen of screens) {
        step(`Navigate to ${screen.name}`);
        await screen.action();

        step(`Verify ${screen.name} screen`);
        const isDisplayed = await screen.verify();
        expect(isDisplayed).to.be.true;
      }
    });
  });

  describe('Menu navigation @regression', () => {
    it('should open menu panel', async () => {
      step('Open menu');
      await MenuPage.openMenu();

      step('Verify menu is open');
      const isOpen = await MenuPage.isMenuOpen();
      expect(isOpen).to.be.true;

      step('Close menu');
      await MenuPage.closeMenu();
    });

    it('should navigate via menu items', async () => {
      step('Open menu');
      await MenuPage.openMenu();

      step('Verify menu items are displayed');
      const menuItems = await MenuPage.getAllMenuItems();
      expect(menuItems.length).to.be.greaterThan(0);

      step('Close menu');
      await MenuPage.closeMenu();
    });
  });

  describe('Back navigation @regression', () => {
    it('should handle back navigation from Login', async () => {
      step('Navigate to Login');
      await HomePage.goToLogin();

      step('Verify on Login screen');
      expect(await LoginPage.isElementDisplayed(LoginPage.emailInput)).to.be.true;

      step('Press device back button');
      await driver.back();
      await HomePage.pause(500);

      step('Verify returned to Home');
      expect(await HomePage.isElementDisplayed(HomePage.homeTab)).to.be.true;
    });

    it('should handle back navigation from Forms', async () => {
      step('Navigate to Forms');
      await HomePage.goToForms();

      step('Verify on Forms screen');
      expect(await FormsPage.isElementDisplayed(FormsPage.textInput)).to.be.true;

      step('Press device back button');
      await driver.back();
      await HomePage.pause(500);

      step('Verify returned to Home');
      expect(await HomePage.isElementDisplayed(HomePage.homeTab)).to.be.true;
    });
  });
});