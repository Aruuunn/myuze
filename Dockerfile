FROM cypress/included:7.4.0 AS builder
WORKDIR /app
COPY . . 
RUN npm install -g yarn
RUN yarn
RUN yarn run install
RUN yarn run build:web
RUN yarn run test-build:web

FROM node:alpine
COPY --from=builder packages/api/dist .
COPY --from=builder packages/web/build public

CMD ["node", "index.js"]

