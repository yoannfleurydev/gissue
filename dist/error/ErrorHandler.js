"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk = require('chalk');
var errors = require('../../config/errors.json').errors;
var printError = chalk.bold.red;
var ErrorHandler = (function () {
    function ErrorHandler(key) {
        var error = errors[key];
        console.error(printError(error.message));
        process.exit(parseInt(error.code));
    }
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map