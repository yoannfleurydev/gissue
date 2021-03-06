export const enum ErrorEnum {
  NOT_A_GIT_REPOSITORY = 0,
  HTTP_REQUEST_FAILURE = 1,
  CONFIG_FILE_NOT_FOUND = 2
}

export class Error {
  public key: string;
  public code: string;
  public message: string;
}