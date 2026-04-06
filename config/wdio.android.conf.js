const { config } = require('../../wdio.conf.js');
const { join } = require('path');

exports.config = {
  ...config,
  capabilities: [
    {
      platformName: 'Android',
      'appium:automationName': 'UiAutomator2',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '14',
      'appium:app': join(process.cwd(), 'app/android/android-wdio-demo-app.apk'),
      'appium:autoGrantPermissions': true,
      'appium:noReset': false,
      'appium:newCommandTimeout': 300,
      'appium:appWaitActivity': '*',
      'appium:appWaitPackage': 'com.wdiodemoapp',
      'appium:uiautomator2ServerLaunchTimeout': 60000,
      'appium:uiautomator2ServerInstallTimeout': 60000,
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