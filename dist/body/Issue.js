"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var IssueGithub = (function () {
    function IssueGithub() {
    }
    return IssueGithub;
}());
exports.IssueGithub = IssueGithub;
var IssueGitlab = (function () {
    function IssueGitlab() {
    }
    return IssueGitlab;
}());
exports.IssueGitlab = IssueGitlab;
function printIssue(issue) {
    var delimiter = '+-----------------------------------------------------+';
    if (issue.body != undefined) {
        return delimiter + "\n" + issue.title + "\n" + delimiter + "\n" + issue.body;
    }
    if (issue.description != undefined) {
        return delimiter + "\n" + issue.title + "\n" + delimiter + "\n" + issue.description;
    }
}
exports.printIssue = printIssue;
//# sourceMappingURL=Issue.js.map