import { google, Auth } from 'googleapis';

export class Google {
  private clientId: string;
  private clientSecret: string;
  private redirectURI: string;
  private oauth2Client: Auth.OAuth2Client;

  constructor(clientId: string, clientSecret: string, redirectURI: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectURI = redirectURI;

    this.oauth2Client = new google.auth.OAuth2(
      this.clientId,
      this.clientSecret,
      this.redirectURI,
    );
  }

  public createAuthorizationURL(opts?: Auth.GenerateAuthUrlOpts) {
    return this.oauth2Client.generateAuthUrl(opts);
  }

  public async validateAuthorizationCode(code: string) {
    return this.oauth2Client.getToken(code);
  }

  public async refreshAccessToken(refreshToken: string) {
    this.oauth2Client.setCredentials({ refresh_token: refreshToken });
    const tokens = await this.oauth2Client.refreshAccessToken();
    return tokens.credentials;
  }

  public async revokeToken(token: string) {
    await this.oauth2Client.revokeToken(token);
  }

  public async getUserinfo(accessToken: string) {
    this.oauth2Client.setCredentials({ access_token: accessToken });
    const oauth2 = google.oauth2({
      auth: this.oauth2Client,
      version: 'v2',
    });
    return oauth2.userinfo.get();
  }
}
