const webdriver = require('selenium-webdriver');
const electronPath = require('electron');
const path = require('path');
const driver = new webdriver.Builder()
  .usingServer('http://localhost:9515')
  .withCapabilities({
    chromeOptions: {
      binary: electronPath,
      args: [`app=${path.join(__dirname, '..')}`]
    }
  })
  .forBrowser('electron');
exports.driver = driver;
