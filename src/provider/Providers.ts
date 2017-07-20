export class Provider {
  public name: string;
  public hostname: string;
  public api: string;
  public issue: string;
}

export function getProviders(): Object {
  return require('../../config/providers.json');
}

export function getProvider(provider: string): Provider {
  return this.getProviders()[provider];
}