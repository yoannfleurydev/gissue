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
function getIssueURL(provider, project, issue) {
    var projectIdentifier = project;
    if (provider.urlEncodeRepo) {
        projectIdentifier = encodeURIComponent(project);
    }
    var path = provider.issue
        .replace(':repo', projectIdentifier)
        .replace(':issue', issue.toString());
    return 'https://' + provider.subdomain + provider.hostname + path;
}
exports.getIssueURL = getIssueURL;
//# sourceMappingURL=Providers.js.map