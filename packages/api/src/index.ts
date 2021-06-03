import path from "path";
import fastify, { FastifyInstance, RouteShorthandOptions } from "fastify";
import { Server, IncomingMessage, ServerResponse } from "http";

function bootstrap() {
  const PORT = process.env.PORT || "8000";
  const server: FastifyInstance<
    Server,
    IncomingMessage,
    ServerResponse
  > = fastify({ logger: true });

  server.register(require("fastify-static"), {
    root: path.join(__dirname, "public"),
  });

  server.register(require("fastify-etag"));

  server.listen(PORT);
}

bootstrap();
