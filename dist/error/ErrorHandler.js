"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errors = require('../../config/errors.json').errors;
var ErrorHandler = (function () {
    function ErrorHandler(key) {
        var error = errors[key];
        console.error(error.message);
        process.exit(parseInt(error.code));
    }
    return ErrorHandler;
}());
exports.ErrorHandler = ErrorHandler;
//# sourceMappingURL=ErrorHandler.js.map