FROM cypress/included:7.4.0 AS builder
WORKDIR /app
COPY . . 
RUN npm install -g yarn
RUN yarn
RUN yarn run install
RUN yarn run build:web
RUN yarn run test-build:web
RUN yarn run bundle:web

FROM alpine
WORKDIR /app
COPY --from=builder /app/dist .

CMD ["sh"]

