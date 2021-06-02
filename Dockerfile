FROM cypress/included:7.4.0 AS builder
WORKDIR /app
COPY . . 
RUN npm install -g yarn
RUN yarn
RUN yarn run install
RUN yarn run build:web
RUN yarn run test-build:web


FROM golang AS go-builder
WORKDIR /app
COPY --from=builder /app/packages/api .
RUN go build main.go


FROM alpine
WORKDIR /app
COPY --from=go-builder . .
COPY --from=builder /app/packages/web/build client

CMD ["/app/main"]

