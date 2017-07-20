"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ErrorHandler_1 = require("../error/ErrorHandler");
var fs = require("fs");
var CONFIGFILENAME = '.gissue.json';
var Configuration = (function () {
    function Configuration() {
    }
    return Configuration;
}());
exports.Configuration = Configuration;
function getConfiguration() {
    if (!fs.existsSync(process.cwd() + "/" + CONFIGFILENAME)) {
        throw new ErrorHandler_1.ErrorHandler(2);
    }
    return require(process.cwd() + "/" + CONFIGFILENAME);
}
exports.getConfiguration = getConfiguration;
//# sourceMappingURL=Configuration.js.map