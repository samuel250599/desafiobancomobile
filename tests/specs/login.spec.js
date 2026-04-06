const { expect } = require('chai');
const LoginPage = require('../../src/pages/login.page');
const HomePage = require('../../src/pages/home.page');
const testData = require('../../src/data/test-data.json');
const Helpers = require('../../src/utils/helpers');
const { step } = require('@wdio/allure-reporter').default;

describe('Login Screen @smoke @regression', () => {
  beforeEach(async () => {
    await HomePage.waitForHomePageToLoad();
    await LoginPage.goToLogin();
  });

  describe('Login with valid credentials @smoke', () => {
    it('should login successfully with valid credentials', async () => {
      step('Navigate to Login screen');
      expect(await LoginPage.isElementDisplayed(LoginPage.emailInput)).to.be.true;

      step('Enter valid credentials');
      await LoginPage.enterEmail(testData.users.valid.email);
      await LoginPage.enterPassword(testData.users.valid.password);

      step('Tap login button');
      await LoginPage.tapLoginButton();

      step('Verify login success');
      const isSuccess = await LoginPage.isLoginSuccessful();
      expect(isSuccess).to.be.true;
    });
  });

  describe('Login with invalid credentials @regression', () => {
    it('should show error with invalid email format', async () => {
      step('Enter invalid email');
      await LoginPage.enterEmail(testData.users.invalid.email);
      await LoginPage.enterPassword('anyPassword123');

      step('Tap login button');
      await LoginPage.tapLoginButton();

      step('Verify error is displayed');
      const hasError = await LoginPage.isErrorDisplayed();
      expect(hasError).to.be.true;
    });

    it('should show error with empty email', async () => {
      step('Enter empty email');
      await LoginPage.enterEmail('');
      await LoginPage.enterPassword(testData.users.valid.password);

      step('Tap login button');
      await LoginPage.tapLoginButton();

      step('Verify error is displayed');
      const hasError = await LoginPage.isErrorDisplayed();
      expect(hasError).to.be.true;
    });

    it('should show error with empty password', async () => {
      step('Enter empty password');
      await LoginPage.enterEmail(testData.users.valid.email);
      await LoginPage.enterPassword('');

      step('Tap login button');
      await LoginPage.tapLoginButton();

      step('Verify error is displayed');
      const hasError = await LoginPage.isErrorDisplayed();
      expect(hasError).to.be.true;
    });

    it('should show error with empty credentials', async () => {
      step('Enter empty credentials');
      await LoginPage.clearLoginForm();

      step('Tap login button');
      await LoginPage.tapLoginButton();

      step('Verify error is displayed');
      const hasError = await LoginPage.isErrorDisplayed();
      expect(hasError).to.be.true;
    });
  });

  describe('Sign Up functionality @regression', () => {
    it('should navigate to sign up tab', async () => {
      step('Switch to sign up tab');
      await LoginPage.switchToSignUp();

      step('Verify sign up form is displayed');
      expect(await LoginPage.isElementDisplayed(LoginPage.signUpEmailInput)).to.be.true;
      expect(await LoginPage.isElementDisplayed(LoginPage.signUpPasswordInput)).to.be.true;
    });

    it('should validate sign up form fields', async () => {
      step('Switch to sign up tab');
      await LoginPage.switchToSignUp();

      step('Enter empty sign up data');
      await LoginPage.enterSignUpEmail('');
      await LoginPage.enterSignUpPassword('');
      await LoginPage.enterSignUpConfirmPassword('');

      step('Tap sign up button');
      await LoginPage.tapSignUpButton();

      step('Verify error messages are shown');
      const hasError = await LoginPage.isErrorDisplayed();
      expect(hasError).to.be.true;
    });
  });
});