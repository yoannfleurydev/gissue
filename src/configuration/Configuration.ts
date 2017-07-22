import { ErrorHandler } from '../error/ErrorHandler';
import { ErrorEnum } from '../error/ErrorEnum';

import fs = require('fs');

const CONFIGFILENAME = '.gissue.json';

export class Configuration {
  public provider: string;
  public branchRegexp: string;
  public issueMatching: number;
  public ignore: Array<string>;
}

export function getConfiguration(): Configuration {
  if (!fs.existsSync(`${process.cwd()}/${CONFIGFILENAME}`)) {
    throw new ErrorHandler(ErrorEnum.CONFIG_FILE_NOT_FOUND);
  }

  return require(`${process.cwd()}/${CONFIGFILENAME}`);
}

