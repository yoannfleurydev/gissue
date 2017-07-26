import { Configuration } from '../configuration/Configuration';

export class Provider {
  public name: string;
  public hostname: string;
  public subdomain: string;
  public issue: string;
  public urlEncodeRepo: boolean;
}

export function getProviders(): Object {
  return require('../../config/providers.json');
}

export function getProvider(provider: string): Provider {
  return this.getProviders()[provider];
}

/**
 * With the provided parameters, getIssueURL will return the URL to get the 
 * @param provider The provider with the good remote
 * @param project The project identifier 'username/reponame'
 * @param issue The issue identifier
 */
export function getIssueURL(provider: Provider, project: string, issue: number) {
  
  let projectIdentifier = project;
  if (provider.urlEncodeRepo) {
    projectIdentifier = encodeURIComponent(project);
  }

  let path = provider.issue
    .replace(':repo', projectIdentifier)
    .replace(':issue', issue.toString())

  return 'https://' + provider.subdomain + provider.hostname + path;
}
