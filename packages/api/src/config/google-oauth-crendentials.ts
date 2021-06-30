import { config } from 'dotenv';
config(); // inject env variables from .env

export const GOOGLE_OAUTH_CLIENTID = process.env.GOOGLE_OAUTH_CLIENTID;
export const GOOGLE_OAUTH_SECRET = process.env.GOOGLE_OAUTH_SECRET;

if (!GOOGLE_OAUTH_CLIENTID || !GOOGLE_OAUTH_SECRET) {
  throw new Error('Provide Google Oauth Crendentials through env variables!');
}
