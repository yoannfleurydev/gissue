"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Provider = (function () {
    function Provider() {
    }
    return Provider;
}());
exports.Provider = Provider;
function getProviders() {
    return require('../../config/providers.json');
}
exports.getProviders = getProviders;
function getProvider(provider) {
    return this.getProviders()[provider];
}
exports.getProvider = getProvider;
//# sourceMappingURL=Providers.js.map