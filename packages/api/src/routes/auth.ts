import {
  GOOGLE_OAUTH_CLIENTID,
  GOOGLE_OAUTH_SECRET,
} from '../config/google-oauth-crendentials';
import { FastifyServerOptions } from 'fastify';
import { fastifyOauth2 } from 'fastify-oauth2';
import { Fastify } from './../types';

export async function authController(
  fastify: Fastify,
  options: FastifyServerOptions,
) {
  fastify.register(require('fastify-oauth2'), {
    name: 'googleOAuth2',
    scope: ['profile', 'email'],
    credentials: {
      client: {
        id: GOOGLE_OAUTH_CLIENTID,
        secret: GOOGLE_OAUTH_SECRET,
      },
      auth: fastifyOauth2.GOOGLE_CONFIGURATION,
    },
    startRedirectPath: '/google',
    callbackUri: 'http://localhost:8000/auth/google/callback',
    callbackUriParams: {
      access_type: 'offline',
    },
  });

  fastify.get('/google/callback', async function (request, reply) {
    // @ts-ignore
    const token = await fastify.googleOAuth2.getAccessTokenFromAuthorizationCodeFlow(
      request,
    );

    const { access_token, refresh_token } = token;

    reply.cookie('refresh_token', refresh_token ?? '').send({ access_token });
  });
}
