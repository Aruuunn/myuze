import { IncomingMessage, ServerResponse, Server } from 'http';
import { FastifyInstance } from 'fastify';
import 'fastify-cookie';

export type Fastify = FastifyInstance<Server, IncomingMessage, ServerResponse>;
