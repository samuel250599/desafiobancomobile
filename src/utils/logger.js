/**
 * Logger Utility
 * Structured logging for test execution
 */
class Logger {
  constructor(context) {
    this.context = context;
    this.colors = {
      reset: '\x1b[0m',
      red: '\x1b[31m',
      green: '\x1b[32m',
      yellow: '\x1b[33m',
      blue: '\x1b[34m',
      magenta: '\x1b[35m',
      cyan: '\x1b[36m',
    };
  }

  /**
   * Format log entry
   */
  format(level, message, data = null) {
    const timestamp = new Date().toISOString();
    const entry = {
      timestamp,
      level,
      context: this.context,
      message,
      ...(data && { data }),
    };
    return entry;
  }

  /**
   * Get color for level
   */
  getColor(level) {
    const colorMap = {
      debug: this.colors.cyan,
      info: this.colors.green,
      warn: this.colors.yellow,
      error: this.colors.red,
    };
    return colorMap[level] || this.colors.reset;
  }

  /**
   * Log with level
   */
  log(level, message, data = null) {
    const color = this.getColor(level);
    const formatted = this.format(level, message, data);
    const output = JSON.stringify(formatted, null, 2);

    switch (level) {
      case 'error':
        console.error(`${color}${output}${this.colors.reset}`);
        break;
      case 'warn':
        console.warn(`${color}${output}${this.colors.reset}`);
        break;
      default:
        console.log(`${color}${output}${this.colors.reset}`);
    }
  }

  /**
   * Debug level log
   */
  debug(message, data = null) {
    this.log('debug', message, data);
  }

  /**
   * Info level log
   */
  info(message, data = null) {
    this.log('info', message, data);
  }

  /**
   * Warning level log
   */
  warn(message, data = null) {
    this.log('warn', message, data);
  }

  /**
   * Error level log
   */
  error(message, data = null) {
    this.log('error', message, data);
  }

  /**
   * Log test start
   */
  testStart(testName) {
    this.info(`Starting test: ${testName}`);
  }

  /**
   * Log test end
   */
  testEnd(testName, passed = true) {
    const status = passed ? 'PASSED' : 'FAILED';
    const level = passed ? 'info' : 'error';
    this.log(level, `Test ${status}: ${testName}`);
  }

  /**
   * Log step
   */
  step(stepName) {
    this.info(`Step: ${stepName}`);
  }

  /**
   * Log assertion
   */
  assertion(assertion, passed = true) {
    const status = passed ? '✓' : '✗';
    const level = passed ? 'info' : 'error';
    this.log(level, `Assertion: ${status} ${assertion}`);
  }

  /**
   * Log action
   */
  action(actionName, details = null) {
    this.debug(`Action: ${actionName}`, details);
  }

  /**
   * Log element interaction
   */
  element(selector, action) {
    this.debug(`Element: ${action} on ${selector}`);
  }

  /**
   * Log API/Network request
   */
  request(method, url, data = null) {
    this.debug(`Request: ${method} ${url}`, data);
  }

  /**
   * Log API/Network response
   */
  response(status, duration, data = null) {
    const level = status >= 400 ? 'error' : 'debug';
    this.log(level, `Response: ${status} (${duration}ms)`, data);
  }

  /**
   * Log screenshot taken
   */
  screenshot(filename) {
    this.info(`Screenshot saved: ${filename}`);
  }

  /**
   * Log device info
   */
  deviceInfo(info) {
    this.info('Device Info:', info);
  }
}

/**
 * Create logger instance
 */
function createLogger(context) {
  return new Logger(context);
}

module.exports = { Logger, createLogger };