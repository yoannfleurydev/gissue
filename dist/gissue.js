#! /usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var nodegit_1 = require("nodegit");
var ErrorHandler_1 = require("./error/ErrorHandler");
var Issue_1 = require("./body/Issue");
var Configuration_1 = require("./configuration/Configuration");
var path = require("path");
var program = require("commander");
var request = require("request");
var VERSION = require('../package.json').version;
var CONFIGFILE = Configuration_1.getConfiguration();
program
    .version(VERSION)
    .option('-c, --config [path]', 'Define the configuration file')
    .option('-t, --tracker [name]', 'Define the issue tracker')
    .option('-u, --url [url]', 'Define the URL to the issue tracker')
    .parse(process.argv);
var pathToRepository = path.resolve(process.cwd());
var branchRegexp = new RegExp(CONFIGFILE.branchRegexp);
var regexpRemote = /(.*)@(.*):(.*)\.git/g;
nodegit_1.Repository.open(pathToRepository).then(function (repository) {
    repository.getCurrentBranch().then(function (branch) {
        if (CONFIGFILE.ignore.includes(branch.shorthand())) {
            console.log("You're on branch " + branch.shorthand() + " which is ignored. Check your config file if this behavior is not expected.");
            process.exit();
        }
        var branchMatch = branchRegexp.exec(branch.shorthand());
        if (!branchMatch) {
        }
        if (CONFIGFILE.issueMatching > branchMatch.length) {
        }
        var issue = parseInt(branchMatch[CONFIGFILE.issueMatching]);
        if (issue === NaN) {
        }
        nodegit_1.Remote.list(repository).then(function (remotes) {
            remotes.forEach(function (name) { return nodegit_1.Remote.lookup(repository, name, null).then(function (remote) {
                var match = regexpRemote.exec(remote.url());
                var options = {
                    url: "https://api." + match[2] + "/repos/" + match[3] + "/issues/" + issue,
                    headers: {
                        'User-Agent': "gissue/" + VERSION
                    }
                };
                request(options, function (error, response, body) {
                    if (error) {
                        new ErrorHandler_1.ErrorHandler(1);
                    }
                    else {
                        var issue_1 = JSON.parse(body);
                        console.log(Issue_1.printIssue(issue_1));
                    }
                });
            }); });
        });
    });
}).catch(function (error) {
    new ErrorHandler_1.ErrorHandler(0);
});
//# sourceMappingURL=gissue.js.map