import { Repository, Remote } from 'nodegit';
import { ErrorEnum          } from './error/ErrorEnum';
import { ErrorHandler       } from './error/ErrorHandler';
import { Issue              } from './body/Issue';

import path    = require('path');
import program = require('commander');
import request = require('request');
import blessed = require('blessed');

const version = require('../package.json').version;

// Arguments
program
  .version(version)
  .option('-c, --config [path]', 'Define the configuration file')
  .option('-t, --tracker [name]', 'Define the issue tracker')
  .option('-u, --url [url]', 'Define the URL to the issue tracker')
  .parse(process.argv);

let pathToRepository: string = path.resolve(process.cwd());

let regexpBranch: RegExp = /(feat|fix)-(\d+)/g;
let regexpRemote: RegExp = /(.*)@(.*):(.*)\.git/g;

// Check that I am in a git repository
Repository.open(pathToRepository).then(repository => {
  repository.getCurrentBranch().then(branch => {
    let issue = branch.shorthand().split("-")[1];  // TODO Get the issue from matcher REGEXP

    Remote.list(repository).then(remotes => {
      remotes.forEach(name => Remote.lookup(repository, name, null).then(remote => {
        let match = regexpRemote.exec(remote.url());

        let options = {
          url: `https://api.${match[2]}/repos/${match[3]}/issues/${issue}`,
          headers: {
            'User-Agent': 'gissue'
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
