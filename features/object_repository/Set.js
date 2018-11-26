'use strict';
var { By, until, Key } = require('selenium-webdriver');
module.exports.byNombreDelId = By.id('nombreDelId')
module.exports.byNombredelXpath = By.xpath("xpath")
module.exports.byNombreDeLaClassName = By.className('todo lo que va dentro del class')
module.exports.byTitulo = By.xpath("/html/body/app-root/app-holamundo/p")