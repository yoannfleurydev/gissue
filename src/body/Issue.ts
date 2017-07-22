export class Issue {
  public title: string;
  public body: string;
}

export function printIssue(issue: Issue): string {
  let delimiter = '+-----------------------------------------------------+';
  
  return `${delimiter}\n${issue.title}\n${delimiter}\n${issue.body}`;
}