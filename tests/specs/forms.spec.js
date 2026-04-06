const { expect } = require('chai');
const FormsPage = require('../../src/pages/forms.page');
const HomePage = require('../../src/pages/home.page');
const testData = require('../../src/data/test-data.json');
const { step } = require('@wdio/allure-reporter').default;

describe('Forms Screen @smoke @regression', () => {
  beforeEach(async () => {
    await HomePage.waitForHomePageToLoad();
    await FormsPage.goToForms();
  });

  describe('Text Input @smoke', () => {
    it('should enter text in input field and display result', async () => {
      step('Verify forms page is loaded');
      expect(await FormsPage.isElementDisplayed(FormsPage.textInput)).to.be.true;

      step('Enter text in input field');
      const inputText = testData.forms.validInput;
      await FormsPage.enterText(inputText);

      step('Verify text result is displayed');
      const result = await FormsPage.getInputResult();
      expect(result).to.include(inputText);
    });

    it('should clear input field', async () => {
      step('Enter text in input field');
      await FormsPage.enterText('Text to clear');

      step('Clear input field');
      await FormsPage.clearInput();

      step('Verify input is cleared');
      const value = await FormsPage.getElementValue(FormsPage.textInput);
      expect(value).to.equal('');
    });

    it('should handle special characters in input', async () => {
      step('Enter special characters');
      const specialChars = testData.forms.specialChars;
      await FormsPage.enterText(specialChars);

      step('Verify special characters are handled');
      const result = await FormsPage.getInputResult();
      expect(result).to.include(specialChars);
    });
  });

  describe('Switch @regression', () => {
    it('should toggle switch on and off', async () => {
      step('Get initial switch state');
      const initialState = await FormsPage.getSwitchState();

      step('Toggle switch');
      await FormsPage.toggleSwitch();

      step('Verify switch state changed');
      const newState = await FormsPage.getSwitchState();
      expect(newState).to.not.equal(initialState);
    });

    it('should verify switch text changes', async () => {
      step('Toggle switch');
      await FormsPage.toggleSwitch();

      step('Verify switch text is updated');
      const switchText = await FormsPage.getSwitchText();
      expect(switchText).to.exist;
    });
  });

  describe('Dropdown @regression', () => {
    it('should select dropdown option', async () => {
      step('Open dropdown');
      await FormsPage.openDropdown();

      step('Select first option');
      await FormsPage.selectDropdownOption(0);

      step('Verify selection');
      await Helpers.sleep(500);
      const selectedValue = await FormsPage.getDropdownValue();
      expect(selectedValue).to.exist;
    });

    it('should change dropdown selection', async () => {
      step('Open and select first option');
      await FormsPage.openDropdown();
      await FormsPage.selectDropdownOption(0);
      await Helpers.sleep(500);

      step('Open and select second option');
      await FormsPage.openDropdown();
      await FormsPage.selectDropdownOption(1);
      await Helpers.sleep(500);

      step('Verify selection changed');
      const selectedValue = await FormsPage.getDropdownValue();
      expect(selectedValue).to.exist;
    });
  });

  describe('Form validation @regression', () => {
    it('should validate empty input field', async () => {
      step('Clear input field');
      await FormsPage.clearInput();

      step('Verify input is empty');
      const value = await FormsPage.getElementValue(FormsPage.textInput);
      expect(value).to.equal('');
    });

    it('should fill complete form successfully', async () => {
      step('Enter text');
      await FormsPage.enterText(testData.forms.validInput);

      step('Toggle switch');
      await FormsPage.toggleSwitch();

      step('Select dropdown option');
      await FormsPage.openDropdown();
      await FormsPage.selectDropdownOption(0);

      step('Click active button');
      await FormsPage.clickActiveButton();

      step('Verify modal is displayed');
      const isModalVisible = await FormsPage.isModalDisplayed();
      expect(isModalVisible).to.be.true;
    });
  });

  describe('Modal interactions @regression', () => {
    it('should display modal when active button is clicked', async () => {
      step('Click active button');
      await FormsPage.clickActiveButton();

      step('Verify modal title');
      const modalTitle = await FormsPage.getModalTitle();
      expect(modalTitle).to.exist;
    });

    it('should close modal with OK button', async () => {
      step('Open modal');
      await FormsPage.clickActiveButton();
      expect(await FormsPage.isModalDisplayed()).to.be.true;

      step('Click OK button');
      await FormsPage.clickModalOk();

      step('Verify modal is closed');
      await Helpers.sleep(500);
      const isModalVisible = await FormsPage.isModalDisplayed();
      expect(isModalVisible).to.be.false;
    });

    it('should close modal with Cancel button', async () => {
      step('Open modal');
      await FormsPage.clickActiveButton();
      expect(await FormsPage.isModalDisplayed()).to.be.true;

      step('Click Cancel button');
      await FormsPage.clickModalCancel();

      step('Verify modal is closed');
      await Helpers.sleep(500);
      const isModalVisible = await FormsPage.isModalDisplayed();
      expect(isModalVisible).to.be.false;
    });
  });
});