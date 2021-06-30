import path from 'path';
import fastify from 'fastify';

import { Fastify } from './types';

import { authController } from './routes';

function bootstrap() {
  const PORT = process.env.PORT || '8000';
  const server: Fastify = fastify({ logger: true });

  server.register(require('fastify-static'), {
    root: path.join(__dirname, 'public'),
  });

  server.register(require('fastify-etag'));

  server.register(require('fastify-cookie'));

  server.register(authController, { prefix: 'auth' });

  server.listen(PORT, '0.0.0.0');
}

bootstrap();
