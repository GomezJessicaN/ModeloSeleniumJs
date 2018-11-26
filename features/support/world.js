'use strict';

var { defineSupportCode } = require('cucumber');
var { Builder, By, until } = require('selenium-webdriver');
var fs = require('fs');
var platform = process.env.PLATFORM || "CHROME";
var chrome = require('selenium-webdriver/chrome')
var CONFIG = require("../support/config/config").config;

var buildAndroidDriver = function() {
    return new Builder().
    usingServer('http://localhost:4723/wd/hub').
    withCapabilities({
        platformName: 'Android',
        deviceName: 'Android device',
        browserName: 'Chrome'
    }).
    build();
};

var buildChromeDriver = function() {
    var capabilities = {
        'os': 'Windows',
        'os_version': '10',
        'browserName': 'Chrome',
        'browser_version': '70.0 beta',
        'resolution': '1280x800',
        'project': 'Aplicativo Modelo',
        'build': '0.0.1',
        'name': 'Browserstack',
        'browserstack.local': 'true',
        'browserstack.video': 'false',
        'browserstack.timezone': 'UTC−03:00',
        'browserstack.selenium_version': '3.5.2',
        'browserstack.user': 'bsuser47048',
        'browserstack.key': 'vAJT61TXD8iEJjLdjnVE'
    }
    var browserS = CONFIG.BROWSERSTACK;
    if (browserS == true) {
        console.log('browserstack')
        return new Builder().
        usingServer('http://hub-cloud.browserstack.com/wd/hub').
        withCapabilities(capabilities).
        build();
    } else {
        var options = new chrome.Options();
        var chromeHeadless = CONFIG.CHROMEHEADLESS;
        if (chromeHeadless == true) {
            console.log('chromeheadless')
            options.addArguments('headless');
            options.addArguments('disable-gpu');
        }
        return new Builder().forBrowser("chrome").setChromeOptions(options).build();
    };
};

var buildFirefoxDriver = function() {
    return new Builder().forBrowser("firefox").build();
};

var buildDriver = function() {
    switch (platform) {
        case 'ANDROID':
            return buildAndroidDriver();
        case 'FIREFOX':
            return buildFirefoxDriver();
        default:
            return buildChromeDriver();
    }
};

defineSupportCode(function({ setDefaultTimeout }) {
    setDefaultTimeout(60 * 1000);
});

var World = function World(args) {

    var screenshotPath = "screenshots";

    this.driver = buildDriver();
    this.parameters = args.parameters;
    this.w = async function() { await this.driver.wait(() => {}, 500) };

    if (!fs.existsSync(screenshotPath)) {
        fs.mkdirSync(screenshotPath);
    }

};

defineSupportCode(function({ setWorldConstructor }) {
    setWorldConstructor(World);
});