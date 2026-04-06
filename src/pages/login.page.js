const BasePage = require('./base.page');

/**
 * Login Page Object
 * Handles login and sign-up functionality
 */
class LoginPage extends BasePage {
  constructor() {
    super();
    // Tab selectors
    this.loginTab = '~tab-bar-option-login';
    this.loginScreen = '~Login-screen';

    // Login form selectors
    this.emailInput = '~input-email';
    this.passwordInput = '~input-password';
    this.loginButton = '~button-LOGIN';

    // Sign up form selectors
    this.signUpTab = '~button-sign-up-tab';
    this.signUpEmailInput = '~input-sign-up-email';
    this.signUpPasswordInput = '~input-sign-up-password';
    this.signUpConfirmPasswordInput = '~input-sign-up-confirm-password';
    this.signUpButton = '~button-SIGN-UP';

    // Error messages
    this.emailErrorMessage = '~text-error-email';
    this.passwordErrorMessage = '~text-error-password';
    this.genericErrorMessage = '//android.widget.TextView[contains(@text, "error")]|//XCUIElementTypeStaticTensor[contains(@name, "error")]';

    // Success messages
    this.successMessage = '//android.widget.TextView[contains(@text, "success")]|//XCUIElementTypeStaticTensor[contains(@name, "success")]';
    this.loginSuccessTitle = '//android.widget.TextView[@text="You are logged in!"]|//XCUIElementTypeStaticTensor[@name="You are logged in!"]';

    // Alternative selectors using text content
    this.emailInputAlt = '//android.widget.EditText[@content-desc="input-email"]|//XCUIElementTypeTextField[@name="input-email"]';
    this.passwordInputAlt = '//android.widget.EditText[@content-desc="input-password"]|//XCUIElementTypeSecureTextField[@name="input-password"]';
  }

  /**
   * Navigate to Login screen
   */
  async goToLogin() {
    await this.clickElement(this.loginTab);
    await this.waitForElement(this.loginScreen);
  }

  /**
   * Switch to Sign Up tab
   */
  async switchToSignUp() {
    await this.clickElement(this.signUpTab);
  }

  /**
   * Enter email in login form
   */
  async enterEmail(email) {
    await this.setValue(this.emailInput, email);
  }

  /**
   * Enter password in login form
   */
  async enterPassword(password) {
    await this.setValue(this.passwordInput, password);
  }

  /**
   * Tap login button
   */
  async tapLoginButton() {
    await this.clickElement(this.loginButton);
  }

  /**
   * Perform login with credentials
   */
  async login(email, password) {
    await this.enterEmail(email);
    await this.enterPassword(password);
    await this.tapLoginButton();
  }

  /**
   * Enter email in sign up form
   */
  async enterSignUpEmail(email) {
    await this.setValue(this.signUpEmailInput, email);
  }

  /**
   * Enter password in sign up form
   */
  async enterSignUpPassword(password) {
    await this.setValue(this.signUpPasswordInput, password);
  }

  /**
   * Enter confirm password in sign up form
   */
  async enterSignUpConfirmPassword(password) {
    await this.setValue(this.signUpConfirmPasswordInput, password);
  }

  /**
   * Tap sign up button
   */
  async tapSignUpButton() {
    await this.clickElement(this.signUpButton);
  }

  /**
   * Perform sign up
   */
  async signUp(email, password, confirmPassword) {
    await this.switchToSignUp();
    await this.enterSignUpEmail(email);
    await this.enterSignUpPassword(password);
    await this.enterSignUpConfirmPassword(confirmPassword || password);
    await this.tapSignUpButton();
  }

  /**
   * Get email error message
   */
  async getEmailError() {
    if (await this.isElementDisplayed(this.emailErrorMessage)) {
      return this.getElementText(this.emailErrorMessage);
    }
    return null;
  }

  /**
   * Get password error message
   */
  async getPasswordError() {
    if (await this.isElementDisplayed(this.passwordErrorMessage)) {
      return this.getElementText(this.passwordErrorMessage);
    }
    return null;
  }

  /**
   * Get success message
   */
  async getSuccessMessage() {
    await this.pause(1000); // Wait for message to appear
    if (await this.isElementDisplayed(this.loginSuccessTitle)) {
      return this.getElementText(this.loginSuccessTitle);
    }
    if (await this.isElementDisplayed(this.successMessage)) {
      return this.getElementText(this.successMessage);
    }
    return null;
  }

  /**
   * Check if login was successful
   */
  async isLoginSuccessful() {
    await this.pause(2000);
    return this.isElementDisplayed(this.loginSuccessTitle);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorDisplayed() {
    const emailError = await this.isElementDisplayed(this.emailErrorMessage);
    const passwordError = await this.isElementDisplayed(this.passwordErrorMessage);
    return emailError || passwordError;
  }

  /**
   * Wait for login page to load
   */
  async waitForLoginPageToLoad() {
    await this.waitForElement(this.loginTab);
    await this.clickElement(this.loginTab);
    await this.waitForElement(this.emailInput);
  }

  /**
   * Clear all form fields
   */
  async clearLoginForm() {
    await this.clearValue(this.emailInput);
    await this.clearValue(this.passwordInput);
  }
}

module.exports = new LoginPage();