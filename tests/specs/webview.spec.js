const { expect } = require('chai');
const WebViewPage = require('../../src/pages/webview.page');
const HomePage = require('../../src/pages/home.page');
const { step } = require('@wdio/allure-reporter').default;

describe('WebView Screen @regression', () => {
  beforeEach(async () => {
    await HomePage.waitForHomePageToLoad();
    await WebViewPage.goToWebView();
  });

  describe('Context switching @smoke', () => {
    it('should display WebView screen', async () => {
      step('Verify WebView screen is displayed');
      const isDisplayed = await WebViewPage.isElementDisplayed(WebViewPage.webViewScreen);
      expect(isDisplayed).to.be.true;
    });

    it('should have native context by default', async () => {
      step('Get current context');
      const currentContext = await WebViewPage.getCurrentContext();

      step('Verify in native context');
      expect(currentContext).to.equal('NATIVE_APP');
    });

    it('should detect available contexts', async () => {
      step('Get all available contexts');
      const contexts = await WebViewPage.getAllContexts();

      step('Verify at least native context exists');
      expect(contexts).to.include('NATIVE_APP');
    });
  });

  describe('WebView navigation @regression', () => {
    it('should have WebView input field', async () => {
      step('Check for URL input');
      const hasInput = await WebViewPage.isElementDisplayed(WebViewPage.webViewUrlInput);
      expect(hasInput).to.be.true;
    });

    it('should have Go button', async () => {
      step('Check for Go button');
      const hasButton = await WebViewPage.isElementDisplayed(WebViewPage.webViewGoButton);
      expect(hasButton).to.be.true;
    });
  });
});