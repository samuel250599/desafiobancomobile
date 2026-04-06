const { config } = require('../../wdio.conf.js');
const { join } = require('path');

exports.config = {
  ...config,
  capabilities: [
    {
      platformName: 'iOS',
      'appium:automationName': 'XCUITest',
      'appium:deviceName': 'iPhone 15',
      'appium:platformVersion': '17.2',
      'appium:app': join(process.cwd(), 'app/ios/ios-wdio-demo-app.app'),
      'appium:noReset': false,
      'appium:newCommandTimeout': 300,
      'appium:useNewWDA': true,
      'appium:wdaLaunchTimeout': 120000,
      'appium:wdaConnectionTimeout': 120000,
      'appium:bundleId': 'org.wdio.native.demo.app',
    },
  ],

  services: [
    'appium',
    {
      args: {
        allowInsecure: ['chromedriver_autodownload'],
      },
    },
  ],
};