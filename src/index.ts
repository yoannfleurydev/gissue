import { Repository   } from 'nodegit';
import { ErrorEnum    } from './error/ErrorEnum';
import { ErrorHandler } from './error/ErrorHandler';

import path    = require('path');
import program = require('commander');

const version = require('../package.json').version;

// Arguments
program
  .version(version)
  .option('-t, --tracker [name]', 'Define the issue tracker')
  .option('-u, --url [url]', 'Define the URL to the issue tracker')
  .parse(process.argv);

let pathToRepository = path.resolve(process.cwd());

// Check that I am in a git repository
Repository.open(pathToRepository).then(repository => {
  repository.getCurrentBranch().then(branch => {
    console.log(branch.shorthand());
  })
}).catch(error => {
  new ErrorHandler(ErrorEnum.NOT_A_GIT_REPOSITORY);
});