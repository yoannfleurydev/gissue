export interface Issue {
  title: string;
  body?: string;
  description?: string;
}

export class IssueGithub implements Issue {
  public title: string;
  public body: string;
}

export class IssueGitlab implements Issue {
  public title: string;
  public description: string;
}

export function printIssue(issue: Issue): string {
  let delimiter = '+-----------------------------------------------------+';

  if (issue.body != undefined) {
    return `${delimiter}\n${issue.title}\n${delimiter}\n${issue.body}`;
  }
  if (issue.description != undefined) {
    return `${delimiter}\n${issue.title}\n${delimiter}\n${issue.description}`;
  }
}