const { join } = require('path');

exports.config = {
  runner: 'local',
  framework: 'mocha',
  mochaOpts: {
    ui: 'bdd',
    timeout: 120000,
    retries: 1,
  },

  specs: ['./tests/specs/**/*.spec.js'],
  exclude: [],

  maxInstances: 1,
  capabilities: [{}],

  services: [
    'appium',
    {
      args: {
        allowInsecure: ['chromedriver_autodownload'],
      },
    },
  ],

  port: 4723,
  path: '/',

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

    driver.addCommand('takeScreenshotWithName', async function (name) {
      const timestamp = Date.now();
      const filename = `${name}_${timestamp}.png`;
      const filepath = join(process.cwd(), 'allure-results', filename);
      await this.saveScreenshot(filepath);
      return filepath;
    });
  },

  beforeTest: function (test, context) {
    const testName = test.title || test.name;
    console.log(`\n▶ Starting test: ${testName}`);
  },

  afterTest: async function (test, context, { error, result, passed }) {
    if (!passed) {
      const timestamp = Date.now();
      const filename = `failure_${test.title.replace(/\s+/g, '_')}_${timestamp}.png`;
      await driver.saveScreenshot(`./allure-results/${filename}`);
      console.log(`Screenshot saved: ${filename}`);
    }
  },

  afterScenario: async function (world) {
    const sessionId = driver.sessionId;
    console.log(`Session ID: ${sessionId}`);
  },

  onComplete: function (exitCode, config, capabilities) {
    console.log(`\nTest run completed with exit code: ${exitCode}`);
    console.log(`Allure results available at: allure-results/`);
  },
};