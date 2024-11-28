type FacebookTokens = {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
};

type FacebookResponse = {
  id: string;
  name: string;
  email: string;
};

const authorizationEndpoint = 'https://www.facebook.com/v21.0/dialog/oauth';
const tokenEndpoint = 'https://graph.facebook.com/v21.0/oauth/access_token';
const userEndpoint = 'https://graph.facebook.com/v21.0/me';

export class Facebook {
  private clientId: string;
  private clientSecret: string;
  private redirectURI: string;

  constructor(clientId: string, clientSecret: string, redirectURI: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectURI = redirectURI;
  }

  public createAuthorizationURL(
    state: string,
    scopes: string[] = ['public_profile', 'email'],
  ): string {
    const url = new URL(authorizationEndpoint);
    url.searchParams.set('response_type', 'code');
    url.searchParams.set('client_id', this.clientId);
    url.searchParams.set('state', state);
    url.searchParams.set('scope', scopes.join(' '));
    url.searchParams.set('redirect_uri', this.redirectURI);
    return url.toString();
  }

  public async validateAuthorizationCode(
    code: string,
  ): Promise<FacebookTokens> {
    const body = new URLSearchParams();
    body.set('code', code);
    body.set('redirect_uri', this.redirectURI);
    body.set('client_id', this.clientId);
    body.set('client_secret', this.clientSecret);

    const response = await fetch(tokenEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
      body,
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    const tokens: FacebookTokens = await response.json();
    return tokens;
  }

  public async getUserinfo(
    accessToken: string,
    fields: string[] = ['name', 'email'],
  ) {
    const url = new URL(userEndpoint);
    url.searchParams.set('fields', fields.join(','));
    url.searchParams.set('access_token', accessToken);

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Accept: 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch access token: ${response.statusText}`);
    }

    const userinfo: FacebookResponse = await response.json();
    return userinfo;
  }
}
