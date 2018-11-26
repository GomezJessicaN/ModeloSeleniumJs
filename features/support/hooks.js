'use strict';

var { defineSupportCode } = require('cucumber');
var fs = require('fs');
var path = require('path');
var sanitize = require("sanitize-filename");

defineSupportCode(function({ After, AfterAll }) {

    After(function(scenarioResult) {
        if (scenarioResult && scenarioResult.result && scenarioResult.result.status && scenarioResult.result.status === "failed") {
            this.driver.takeScreenshot().then(function(data) {
                var base64Data = data.replace(/^data:image\/png;base64,/, "");
                fs.writeFile(path.join('screenshots', sanitize(scenarioResult.pickle.name + ".png").replace(/ /g, "_")), base64Data, 'base64', function(err) {
                    if (err) console.error(err);
                });
            });
        }

        if (!this.parameters.disableDriverQuit) {
            return this.driver.quit();
        }
    });
});