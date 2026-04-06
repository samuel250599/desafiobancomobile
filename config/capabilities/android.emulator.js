/**
 * Android Emulator Capabilities
 * Use this file for local Android emulator testing
 */

module.exports = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': 'emulator-5554',
  'appium:platformVersion': '14',
  'appium:app': process.cwd() + '/app/android/android-wdio-demo-app.apk',
  'appium:autoGrantPermissions': true,
  'appium:noReset': false,
  'appium:newCommandTimeout': 300,
  'appium:appWaitActivity': '*',
  'appium:appWaitPackage': 'com.wdiodemoapp',
  'appium:uiautomator2ServerLaunchTimeout': 60000,
  'appium:uiautomator2ServerInstallTimeout': 60000,
};

/**
 * Android Real Device Capabilities
 * Uncomment for physical device testing
 */

/*
module.exports = {
  platformName: 'Android',
  'appium:automationName': 'UiAutomator2',
  'appium:deviceName': '<DEVICE_ID>',
  'appium:udid': '<DEVICE_UDID>',
  'appium:platformVersion': '<ANDROID_VERSION>',
  'appium:app': process.cwd() + '/app/android/android-wdio-demo-app.apk',
  'appium:autoGrantPermissions': true,
  'appium:noReset': false,
  'appium:newCommandTimeout': 300,
};
*/