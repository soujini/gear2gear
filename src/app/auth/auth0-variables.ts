interface AuthConfig {
  clientID: string;
  domain: string;
  callbackURL: string;
}

export const AUTH_CONFIG: AuthConfig = {
  clientID: 'ZKnwKqFeiWfiHSeP34lPImZHC8qOCGUT',
  domain: 'gear2gear.eu.auth0.com',
  callbackURL: 'http://localhost:3000/callback',

};
