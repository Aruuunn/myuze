FROM node:alpine AS builder

WORKDIR /app

COPY . .

RUN yarn

RUN yarn run install

RUN yarn run build

FROM golang

WORKDIR /app

COPY --from=builder /app/packages/web/build client

COPY --from=builder /app/packages/api .

RUN go build main.go

CMD ["/app/main"]

