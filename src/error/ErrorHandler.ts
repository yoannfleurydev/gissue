import { ErrorEnum, Error } from './ErrorEnum';

const chalk = require('chalk');

let errors: Array<Error> = require('../../config/errors.json').errors;
const printError = chalk.bold.red;

export class ErrorHandler {
  constructor(key: ErrorEnum) {
    let error: Error = errors[key];
    console.error(printError(error.message));
    process.exit(parseInt(error.code));
  }
}