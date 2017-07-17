import { Repository, Remote } from 'nodegit';
import { ErrorEnum          } from './error/ErrorEnum';
import { ErrorHandler       } from './error/ErrorHandler';
import { Issue              } from './body/Issue';

import path    = require('path');
import program = require('commander');
import request = require('request');

const VERSION = require('../package.json').version;
const CONFIGFILENAME = '.gissue.json';
const CONFIGFILE = require(`${process.cwd()}/${CONFIGFILENAME}`);

// Arguments
program
  .version(VERSION)
  .option('-c, --config [path]', 'Define the configuration file')
  .option('-t, --tracker [name]', 'Define the issue tracker')
  .option('-u, --url [url]', 'Define the URL to the issue tracker')
  .parse(process.argv);

let pathToRepository: string = path.resolve(process.cwd());

let branchRegexp: RegExp = new RegExp(CONFIGFILE.branchRegexp);
let issueMatching: number = CONFIGFILE.issueMatching;
let ignore: Array<string> = CONFIGFILE.ignore;
let regexpRemote: RegExp = /(.*)@(.*):(.*)\.git/g;

// Check that I am in a git repository
Repository.open(pathToRepository).then(repository => {
  repository.getCurrentBranch().then(branch => {
    if (ignore.includes(branch.shorthand())) {
      console.log(`You're on branch ${branch.shorthand()} which is ignored. Check your config file if this behavior is not expected.`);
      process.exit();
    }

    let branchMatch = branchRegexp.exec(branch.shorthand());

    if (!branchMatch) {
      // TODO throw error regexp does not match
    }

    if (issueMatching > branchMatch.length - 1) {
      // TODO throw error issueMatching not a valid regexp group
    }

    let issue = parseInt(branchMatch[issueMatching]);

    if (issue === NaN) {
      // TODO throw error matched group NaN
    }
    

    Remote.list(repository).then(remotes => {
      remotes.forEach(name => Remote.lookup(repository, name, null).then(remote => {
        let match = regexpRemote.exec(remote.url());

        let options = {
          url: `https://api.${match[2]}/repos/${match[3]}/issues/${issue}`,
          headers: {
            'User-Agent': `gissue/${VERSION}`
          }
        };

        request(options, (error, response, body) => {
          if (error) {
            new ErrorHandler(ErrorEnum.HTTP_REQUEST_FAILURE);
          } else {
            let issue: Issue = JSON.parse(body);
            console.log(`=====================================`)
            console.log(`Title : ${issue.title}`);
            console.log(`-------------------------------------`)
            console.log(`Description : ${issue.body}`);
          } 
        })
      }));
    });
  });
}).catch(error => {
  new ErrorHandler(ErrorEnum.NOT_A_GIT_REPOSITORY);
});
