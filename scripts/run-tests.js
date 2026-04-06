const { remote } = require('webdriverio');

// BrowserStack capabilities
const capabilities = {
  platformName: 'Android',
  'appium:deviceName': 'Google Pixel 7',
  'appium:automationName': 'UiAutomator2',
  'appium:platformVersion': '13.0',
  'appium:app': 'bs://bee9f6628c4d1274eea38cffc29271a7bc42921b',
  'bstack:options': {
    deviceName: 'Google Pixel 7',
    platformName: 'Android',
    platformVersion: '13.0',
    debug: true,
    networkLogs: true,
  },
};

const BROWSERSTACK_USERNAME = 'samuelsilva_AQmP2p';
const BROWSERSTACK_ACCESS_KEY = 'ZVFjptUpijjSGaWN3y7u';

// Helper function to find element with multiple strategies
async function findElement(driver, strategies) {
  for (const strategy of strategies) {
    try {
      let element;
      if (strategy.type === 'accessibility') {
        element = await driver.$(`~${strategy.value}`);
      } else if (strategy.type === 'xpath') {
        element = await driver.$(strategy.value);
      } else if (strategy.type === 'id') {
        element = await driver.$(`id=${strategy.value}`);
      }

      await element.waitForDisplayed({ timeout: 5000 });
      return element;
    } catch (e) {
      continue;
    }
  }
  throw new Error('Element not found with any strategy');
}

// Test functions
async function runTests() {
  console.log('🚀 Iniciando testes no BrowserStack...\n');

  let driver;
  let passed = 0;
  let failed = 0;
  const testResults = [];

  try {
    driver = await remote({
      user: BROWSERSTACK_USERNAME,
      key: BROWSERSTACK_ACCESS_KEY,
      capabilities,
      logLevel: 'info',
    });

    console.log('✅ Conectado ao dispositivo BrowserStack');
    console.log(`📱 Device: ${capabilities['bstack:options'].deviceName}`);
    console.log(`🤖 Platform: ${capabilities['bstack:options'].platformName} ${capabilities['bstack:options'].platformVersion}\n`);

    // Test 1: Launch App
    console.log('Test 1: Launch App');
    try {
      await driver.pause(5000); // Wait for app to fully load
      const sessionId = driver.sessionId;
      console.log(`✅ App launched successfully (Session: ${sessionId.substring(0, 8)}...)\n`);
      testResults.push({ name: 'Launch App', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ App launch failed: ${error.message}\n`);
      testResults.push({ name: 'Launch App', status: 'failed', error: error.message });
      failed++;
    }

    // Test 2: Find and Interact with Home Screen
    console.log('Test 2: Find Home Screen Elements');
    try {
      await driver.pause(2000);
      // Try multiple strategies to find home elements
      const homeTab = await findElement(driver, [
        { type: 'accessibility', value: 'Home' },
        { type: 'accessibility', value: 'tab-bar-option-home' },
        { type: 'xpath', value: '//android.widget.TextView[@text="Home"]' },
        { type: 'xpath', value: '//android.view.View[@content-desc="Home"]' },
      ]);
      console.log('✅ Home screen elements found\n');
      testResults.push({ name: 'Find Home Screen Elements', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Home screen elements not found: ${error.message}\n`);
      testResults.push({ name: 'Find Home Screen Elements', status: 'failed', error: error.message });
      failed++;
    }

    // Test 3: Navigate to Login Tab
    console.log('Test 3: Navigate to Login Tab');
    try {
      await driver.pause(1000);
      const loginTab = await findElement(driver, [
        { type: 'accessibility', value: 'Login' },
        { type: 'accessibility', value: 'tab-bar-option-login' },
        { type: 'xpath', value: '//android.widget.TextView[@text="Login"]' },
        { type: 'xpath', value: '//android.view.View[@content-desc="Login"]' },
        { type: 'xpath', value: '//android.widget.Button[@text="Login"]' },
      ]);
      await loginTab.click();
      await driver.pause(2000);
      console.log('✅ Navigated to Login screen\n');
      testResults.push({ name: 'Navigate to Login Tab', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Login navigation failed: ${error.message}\n`);
      testResults.push({ name: 'Navigate to Login Tab', status: 'failed', error: error.message });
      failed++;
    }

    // Test 4: Find Login Form Elements
    console.log('Test 4: Find Login Form Elements');
    try {
      await driver.pause(1000);
      // Find email input
      const emailInput = await findElement(driver, [
        { type: 'accessibility', value: 'input-email' },
        { type: 'xpath', value: '//android.widget.EditText[@text="Email"]' },
        { type: 'xpath', value: '//android.widget.EditText[1]' },
        { type: 'xpath', value: '//android.widget.EditText[contains(@text, "Email")]' },
      ]);
      console.log('✅ Email input found');

      // Find password input
      const passwordInput = await findElement(driver, [
        { type: 'accessibility', value: 'input-password' },
        { type: 'xpath', value: '//android.widget.EditText[@text="Password"]' },
        { type: 'xpath', value: '//android.widget.EditText[2]' },
        { type: 'xpath', value: '//android.widget.EditText[contains(@text, "Password")]' },
      ]);
      console.log('✅ Password input found');

      // Find login button
      const loginButton = await findElement(driver, [
        { type: 'accessibility', value: 'button-LOGIN' },
        { type: 'xpath', value: '//android.widget.Button[@text="LOGIN"]' },
        { type: 'xpath', value: '//android.widget.Button[contains(@text, "Login")]' },
        { type: 'xpath', value: '//android.widget.Button[contains(@text, "LOGIN")]' },
      ]);
      console.log('✅ Login button found\n');
      testResults.push({ name: 'Find Login Form Elements', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Login form elements not found: ${error.message}\n`);
      testResults.push({ name: 'Find Login Form Elements', status: 'failed', error: error.message });
      failed++;
    }

    // Test 5: Enter Credentials
    console.log('Test 5: Enter Credentials');
    try {
      await driver.pause(500);
      const emailInput = await findElement(driver, [
        { type: 'accessibility', value: 'input-email' },
        { type: 'xpath', value: '//android.widget.EditText[@text="Email"]' },
        { type: 'xpath', value: '//android.widget.EditText[1]' },
      ]);

      const passwordInput = await findElement(driver, [
        { type: 'accessibility', value: 'input-password' },
        { type: 'xpath', value: '//android.widget.EditText[@text="Password"]' },
        { type: 'xpath', value: '//android.widget.EditText[2]' },
      ]);

      await emailInput.setValue('test@example.com');
      await passwordInput.setValue('Test1234!');
      console.log('✅ Credentials entered\n');
      testResults.push({ name: 'Enter Credentials', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Credential entry failed: ${error.message}\n`);
      testResults.push({ name: 'Enter Credentials', status: 'failed', error: error.message });
      failed++;
    }

    // Test 6: Navigate to Forms Tab
    console.log('Test 6: Navigate to Forms Tab');
    try {
      await driver.pause(500);
      const formsTab = await findElement(driver, [
        { type: 'accessibility', value: 'Forms' },
        { type: 'accessibility', value: 'tab-bar-option-forms' },
        { type: 'xpath', value: '//android.widget.TextView[@text="Forms"]' },
        { type: 'xpath', value: '//android.view.View[@content-desc="Forms"]' },
        { type: 'xpath', value: '//android.widget.Button[@text="Forms"]' },
      ]);
      await formsTab.click();
      await driver.pause(2000);
      console.log('✅ Navigated to Forms screen\n');
      testResults.push({ name: 'Navigate to Forms Tab', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Forms navigation failed: ${error.message}\n`);
      testResults.push({ name: 'Navigate to Forms Tab', status: 'failed', error: error.message });
      failed++;
    }

    // Test 7: Find Form Elements
    console.log('Test 7: Find Form Elements');
    try {
      await driver.pause(1000);
      const textInput = await findElement(driver, [
        { type: 'accessibility', value: 'text-input' },
        { type: 'xpath', value: '//android.widget.EditText' },
        { type: 'xpath', value: '//android.widget.EditText[@content-desc="text-input"]' },
      ]);
      console.log('✅ Text input found');

      const switchElement = await findElement(driver, [
        { type: 'accessibility', value: 'switch' },
        { type: 'xpath', value: '//android.widget.Switch' },
        { type: 'xpath', value: '//android.widget.Switch[@content-desc="switch"]' },
      ]);
      console.log('✅ Switch element found\n');
      testResults.push({ name: 'Find Form Elements', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Form elements not found: ${error.message}\n`);
      testResults.push({ name: 'Find Form Elements', status: 'failed', error: error.message });
      failed++;
    }

    // Test 8: Enter Text in Form
    console.log('Test 8: Enter Text in Form');
    try {
      await driver.pause(500);
      const textInput = await findElement(driver, [
        { type: 'accessibility', value: 'text-input' },
        { type: 'xpath', value: '//android.widget.EditText' },
      ]);
      await textInput.setValue('Test Input Text');
      console.log('✅ Text entered in form\n');
      testResults.push({ name: 'Enter Text in Form', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Text entry failed: ${error.message}\n`);
      testResults.push({ name: 'Enter Text in Form', status: 'failed', error: error.message });
      failed++;
    }

    // Test 9: Navigate to Swipe Tab
    console.log('Test 9: Navigate to Swipe Tab');
    try {
      await driver.pause(500);
      const swipeTab = await findElement(driver, [
        { type: 'accessibility', value: 'Swipe' },
        { type: 'accessibility', value: 'tab-bar-option-swipe' },
        { type: 'xpath', value: '//android.widget.TextView[@text="Swipe"]' },
        { type: 'xpath', value: '//android.view.View[@content-desc="Swipe"]' },
        { type: 'xpath', value: '//android.widget.Button[@text="Swipe"]' },
      ]);
      await swipeTab.click();
      await driver.pause(2000);
      console.log('✅ Navigated to Swipe screen\n');
      testResults.push({ name: 'Navigate to Swipe Tab', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Swipe navigation failed: ${error.message}\n`);
      testResults.push({ name: 'Navigate to Swipe Tab', status: 'failed', error: error.message });
      failed++;
    }

    // Test 10: Find Carousel/Swipe Elements
    console.log('Test 10: Find Carousel/Swipe Elements');
    try {
      await driver.pause(1000);
      // Try to find carousel or swipeable content
      const carousel = await findElement(driver, [
        { type: 'accessibility', value: 'Carousel' },
        { type: 'xpath', value: '//android.view.View[@content-desc="Carousel"]' },
        { type: 'xpath', value: '//android.widget.GridView' },
        { type: 'xpath', value: '//android.view.View[@clickable="true"]' },
        { type: 'xpath', value: '//android.widget.ImageView' },
      ]);
      console.log('✅ Carousel/Swipe elements found\n');
      testResults.push({ name: 'Find Carousel/Swipe Elements', status: 'passed' });
      passed++;
    } catch (error) {
      console.log(`❌ Carousel/Swipe elements not found: ${error.message}\n`);
      testResults.push({ name: 'Find Carousel/Swipe Elements', status: 'failed', error: error.message });
      failed++;
    }

  } catch (error) {
    console.log(`❌ Test execution failed: ${error.message}`);
    failed++;
  } finally {
    if (driver) {
      await driver.deleteSession();
      console.log('🔚 Session ended');
    }

    console.log('\n===========================================');
    console.log('📊 TEST RESULTS');
    console.log('===========================================');
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`📈 Total: ${passed + failed}`);
    console.log(`📊 Success Rate: ${((passed / (passed + failed)) * 100).toFixed(1)}%`);
    console.log('===========================================');

    // Write results to file for Allure
    const fs = require('fs');
    const allureResultsDir = './allure-results';
    if (!fs.existsSync(allureResultsDir)) {
      fs.mkdirSync(allureResultsDir, { recursive: true });
    }

    // Generate Allure results
    const timestamp = Date.now();
    testResults.forEach((test, index) => {
      const result = {
        uuid: `test-${index}-${timestamp}`,
        historyId: test.name,
        name: test.name,
        status: test.status,
        stage: 'finished',
        start: timestamp - (10 - index) * 1000,
        stop: timestamp,
      };

      if (test.error) {
        result.statusDetails = {
          message: test.error,
        };
      }

      fs.writeFileSync(
        `${allureResultsDir}/${result.uuid}-result.json`,
        JSON.stringify(result, null, 2)
      );
    });

    console.log('\n📁 Allure results written to: allure-results/');
    console.log('   Run: npm run allure:serve to view the report');
  }

  return { passed, failed };
}

// Run tests
runTests().catch(console.error);