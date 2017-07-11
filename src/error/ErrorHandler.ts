import { ErrorEnum } from './ErrorEnum';

let errors = require('../../config/errors.json').errors;

export class ErrorHandler {
  constructor(key: ErrorEnum) {
    let error = errors[key];
    console.error(error.message);
  }
}