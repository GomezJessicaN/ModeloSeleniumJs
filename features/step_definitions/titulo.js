'use strict';

var { Given, When, Then } = require('cucumber');
var { By, until, Key } = require('selenium-webdriver');
var { expect, assert } = require('chai');
var CONFIG = require("../support/config/config").config;
var { byTitulo } = require("../object_repository/Set");



Given('que ingrese a la pantalla del modelo de angular', async function() {
    var width = 1280;
    var height = 960;
    await this.driver.manage().window().setRect({ x: 0, y: 0, width: width, height: height });
    var url = CONFIG.SITE_URL;
    var rect = await this.driver.manage().window().getRect();
    assert.equal(width, rect.width);
    await this.driver.get(url)
});

Then('se visualiza el titulo Modelo de Angular', async function() {
    await this.driver.wait(until.elementLocated(byTitulo));
});