const chalk = require('chalk');

export interface Issue {
  title: string;
  body?: string;
  description?: string;
  state: string;
}

export class IssueGithub implements Issue {
  public title: string;
  public body: string;
  public state: string;
}

export class IssueGitlab implements Issue {
  public title: string;
  public description: string;
  public state: string;
}

export function printIssue(issue: Issue): string {
  let color = chalk.green;
  if (issue.state === "closed") {
    color = chalk.red;
  }

  let delimiter = '+-----------------------------------------------------+';

  if (issue.body != undefined) {
    return color(`${delimiter}\n${issue.title}\n${delimiter}\n${issue.body}`);
  }
  if (issue.description != undefined) {
    return color(`${delimiter}\n${issue.title}\n${delimiter}\n${issue.description}`);
  }
}