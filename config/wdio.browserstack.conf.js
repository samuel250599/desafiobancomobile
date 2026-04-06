require('dotenv').config();

const BROWSERSTACK_USERNAME = process.env.BROWSERSTACK_USERNAME || 'samuelsilva_AQmP2p';
const BROWSERSTACK_ACCESS_KEY = process.env.BROWSERSTACK_ACCESS_KEY || 'ZVFjptUpijjSGaWN3y7u';
const BROWSERSTACK_APP_URL = process.env.BROWSERSTACK_APP_URL || 'bs://bee9f6628c4d1274eea38cffc29271a7bc42921b';

exports.config = {
  runner: 'local',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    retries: 1,
  },

  specs: [
    './tests/specs/login.spec.js',
    './tests/specs/forms.spec.js',
    './tests/specs/swipe.spec.js',
    './tests/specs/drag.spec.js',
    './tests/specs/navigation.spec.js',
    './tests/specs/webview.spec.js',
  ],
  exclude: [],

  maxInstances: 1,

  user: BROWSERSTACK_USERNAME,
  key: BROWSERSTACK_ACCESS_KEY,

  capabilities: [
    {
      'bstack:options': {
        deviceName: 'Google Pixel 7',
        platformName: 'Android',
        platformVersion: '13.0',
        app: BROWSERSTACK_APP_URL,
        local: true,
        debug: true,
        networkLogs: true,
        deviceLogs: true,
      },
      'appium:automationName': 'UiAutomator2',
      'appium:platformName': 'Android',
      'appium:deviceName': 'Google Pixel 7',
    },
  ],

  services: [
    [
      'browserstack',
      {
        browserstackLocal: true,
        testObservability: true,
        testObservabilityOptions: {
          projectName: 'Native Demo App Tests',
          buildName: 'Build ' + new Date().toISOString().slice(0, 10),
        },
      },
    ],
  ],

  logLevel: 'info',
  bail: 0,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,

  reporters: [
    'spec',
    [
      'allure',
      {
        outputDir: 'allure-results',
        disableWebdriverStepsReporting: false,
        disableWebdriverScreenshotsReporting: false,
      },
    ],
  ],

  automationProtocol: 'webdriver',

  beforeSession: function (config, capabilities, specs) {
    require('chai').should();
  },

  before: function (capabilities, specs) {
    global.expect = require('chai').expect;
    global.assert = require('chai').assert;
  },

  beforeTest: function (test, context) {
    const testName = test.title || test.name;
    console.log(`\n▶ Starting test: ${testName}`);
  },

  afterTest: async function (test, context, { error, result, passed }) {
    if (!passed) {
      const timestamp = Date.now();
      const filename = `failure_${test.title.replace(/\s+/g, '_')}_${timestamp}.png`;
      try {
        await driver.saveScreenshot(`./allure-results/${filename}`);
        console.log(`Screenshot saved: ${filename}`);
      } catch (e) {
        console.log('Could not save screenshot:', e.message);
      }
    }
  },

  onComplete: function (exitCode, config, capabilities) {
    console.log(`\nTest run completed with exit code: ${exitCode}`);
    console.log(`Allure results available at: allure-results/`);
  },
};