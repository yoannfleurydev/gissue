#! /usr/bin/env node

import { Repository, Remote } from 'nodegit';
import { ErrorEnum          } from './error/ErrorEnum';
import { ErrorHandler       } from './error/ErrorHandler';
import { Issue, printIssue  } from './body/Issue';

import { getProvider, getIssueURL } from './provider/Providers';
import { getConfiguration         } from './configuration/Configuration';

import path    = require('path');
import program = require('commander');
import request = require('request');

const VERSION = require('../package.json').version;
const CONFIGFILE = getConfiguration();

// Arguments
program
  .version(VERSION)
  .option('-c, --config [path]', 'Define the configuration file')
  .option('-t, --tracker [name]', 'Define the issue tracker')
  .option('-u, --url [url]', 'Define the URL to the issue tracker')
  .parse(process.argv);

let pathToRepository: string = path.resolve(process.cwd());

let branchRegexp: RegExp = new RegExp(CONFIGFILE.branchRegexp);
let regexpRemote: RegExp = /(.*)@(.*):(.*)\.git/g;

Repository.open(pathToRepository).then(repository => {
  repository.getCurrentBranch().then(branch => {
    if (CONFIGFILE.ignore.includes(branch.shorthand())) {
      console.log(`You're on branch ${branch.shorthand()} which is ignored. Check your config file if this behavior is not expected.`);
      process.exit();
    }

    let branchMatch = branchRegexp.exec(branch.shorthand());

    if (!branchMatch) {
      // TODO throw error regexp does not match
    }

    if (CONFIGFILE.issueMatching > branchMatch.length) {
      // TODO throw error issueMatching not a valid regexp group
    }

    let issue = parseInt(branchMatch[CONFIGFILE.issueMatching]);

    if (issue === NaN) {
      // TODO throw error matched group NaN
    }

    Remote.list(repository).then(remotes => {
      remotes.forEach(name => Remote.lookup(repository, name, null).then(remote => {
        let match = regexpRemote.exec(remote.url());

        let provider = getProvider(CONFIGFILE.provider);
        provider.hostname = match[2];

        console.log(getIssueURL(provider, match[3], issue));

        let options = {
          url: getIssueURL(provider, match[3], issue),
          headers: {
            'User-Agent': `gissue/${VERSION}`
          }
        };



        request(options, (error, response, body) => {
          if (error) {
            new ErrorHandler(ErrorEnum.HTTP_REQUEST_FAILURE);
          } else {
            let issue: Issue = JSON.parse(body);
            console.log(printIssue(issue));
          }
        })
      }));
    });
  });
}).catch(error => {
  new ErrorHandler(ErrorEnum.NOT_A_GIT_REPOSITORY);
});
