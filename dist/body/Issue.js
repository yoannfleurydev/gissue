"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Issue = (function () {
    function Issue() {
    }
    return Issue;
}());
exports.Issue = Issue;
function printIssue(issue) {
    var delimiter = '+-----------------------------------------------------+';
    return delimiter + "\n" + issue.title + "\n" + delimiter + "\n" + issue.body;
}
exports.printIssue = printIssue;
//# sourceMappingURL=Issue.js.map