const BasePage = require('./base.page');

/**
 * Forms Page Object
 * Handles form elements: input, switch, dropdown, button
 */
class FormsPage extends BasePage {
  constructor() {
    super();
    // Tab selector
    this.formsTab = '~tab-bar-option-forms';
    this.formsScreen = '~Forms-screen';

    // Input field
    this.textInput = '~text-input';
    this.textInputResult = '~input-text-result';

    // Switch
    this.switchElement = '~switch';
    this.switchText = '~switch-text';

    // Dropdown
    this.dropdown = '~Dropdown';
    this.dropdownOption1 = '~UI Alerter (Alert)';
    this.dropdownOption2 = '~UI Commander (Action)';
    this.dropdownOption3 = '~UI Linter (Lint)';
    this.dropdownOption4 = '~UI Writer (Write)';
    this.dropdownResult = '~text-Dropdown';

    // Button
    this.activeButton = '~button-Active';
    this.inactiveButton = '~button-InActive';
    this.pushButton = '~button-Push';

    // Modal
    this.modalTitle = '//android.widget.TextView[@text="This button is active"]|//XCUIElementTypeStaticTensor[@name="This button is active"]';
    this.modalAskMeLaterButton = '~button-Ask me later';
    this.modalCancelButton = '~button-Cancel';
    this.modalOkButton = '~button-OK';

    // Alternative selectors
    this.textInputAlt = '//android.widget.EditText[@content-desc="text-input"]|//XCUIElementTypeTextField[@name="text-input"]';
    this.switchAlt = '//android.widget.Switch[@content-desc="switch"]|//XCUIElementTypeSwitch[@name="switch"]';
  }

  /**
   * Navigate to Forms screen
   */
  async goToForms() {
    await this.clickElement(this.formsTab);
    await this.waitForElement(this.formsScreen);
  }

  /**
   * Enter text in input field
   */
  async enterText(text) {
    await this.setValue(this.textInput, text);
  }

  /**
   * Get input text result
   */
  async getInputResult() {
    return this.getElementText(this.textInputResult);
  }

  /**
   * Clear input field
   */
  async clearInput() {
    await this.clearValue(this.textInput);
  }

  /**
   * Toggle switch
   */
  async toggleSwitch() {
    await this.clickElement(this.switchElement);
  }

  /**
   * Get switch state
   */
  async getSwitchState() {
    const element = await $(this.switchElement);
    const value = await element.getAttribute('value');
    return value === 'true' || value === '1';
  }

  /**
   * Get switch text
   */
  async getSwitchText() {
    return this.getElementText(this.switchText);
  }

  /**
   * Open dropdown
   */
  async openDropdown() {
    await this.clickElement(this.dropdown);
    await this.pause(500);
  }

  /**
   * Select dropdown option by index
   */
  async selectDropdownOption(index) {
    const options = [
      this.dropdownOption1,
      this.dropdownOption2,
      this.dropdownOption3,
      this.dropdownOption4,
    ];
    if (index >= 0 && index < options.length) {
      await this.clickElement(options[index]);
    }
  }

  /**
   * Get selected dropdown value
   */
  async getDropdownValue() {
    return this.getElementText(this.dropdownResult);
  }

  /**
   * Click active button
   */
  async clickActiveButton() {
    await this.clickElement(this.activeButton);
  }

  /**
   * Click push button
   */
  async clickPushButton() {
    await this.clickElement(this.pushButton);
  }

  /**
   * Check if modal is displayed
   */
  async isModalDisplayed() {
    return this.isElementDisplayed(this.modalTitle);
  }

  /**
   * Get modal title
   */
  async getModalTitle() {
    return this.getElementText(this.modalTitle);
  }

  /**
   * Click modal OK button
   */
  async clickModalOk() {
    await this.clickElement(this.modalOkButton);
  }

  /**
   * Click modal Cancel button
   */
  async clickModalCancel() {
    await this.clickElement(this.modalCancelButton);
  }

  /**
   * Click modal Ask me later button
   */
  async clickModalAskMeLater() {
    await this.clickElement(this.modalAskMeLaterButton);
  }

  /**
   * Fill form and submit
   */
  async fillForm(text, switchToggle = false, dropdownIndex = 0) {
    await this.enterText(text);
    if (switchToggle) {
      await this.toggleSwitch();
    }
    if (dropdownIndex >= 0) {
      await this.openDropdown();
      await this.selectDropdownOption(dropdownIndex);
    }
    await this.clickActiveButton();
  }

  /**
   * Wait for forms page to load
   */
  async waitForFormsPageToLoad() {
    await this.waitForElement(this.formsTab);
    await this.clickElement(this.formsTab);
    await this.waitForElement(this.textInput);
  }
}

module.exports = new FormsPage();