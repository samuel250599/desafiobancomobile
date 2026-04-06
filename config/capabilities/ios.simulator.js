/**
 * iOS Simulator Capabilities
 * Use this file for local iOS simulator testing
 * Note: iOS requires macOS with Xcode installed
 */

module.exports = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': 'iPhone 15',
  'appium:platformVersion': '17.2',
  'appium:app': process.cwd() + '/app/ios/ios-wdio-demo-app.app',
  'appium:noReset': false,
  'appium:newCommandTimeout': 300,
  'appium:useNewWDA': true,
  'appium:wdaLaunchTimeout': 120000,
  'appium:wdaConnectionTimeout': 120000,
  'appium:bundleId': 'org.wdio.native.demo.app',
};

/**
 * iOS Real Device Capabilities
 * Uncomment for physical device testing (requires Apple Developer account)
 */

/*
module.exports = {
  platformName: 'iOS',
  'appium:automationName': 'XCUITest',
  'appium:deviceName': '<DEVICE_NAME>',
  'appium:udid': '<DEVICE_UDID>',
  'appium:platformVersion': '<IOS_VERSION>',
  'appium:app': process.cwd() + '/app/ios/ios-wdio-demo-app.app',
  'appium:noReset': false,
  'appium:newCommandTimeout': 300,
  'appium:xcodeOrgId': '<TEAM_ID>',
  'appium:xcodeSigningId': 'iPhone Developer',
  'appium:updatedWDABundleId': '<BUNDLE_ID_PREFIX>.wdabuddy',
};
*/