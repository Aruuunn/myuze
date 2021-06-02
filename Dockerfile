FROM node:alpine
WORKDIR /app
COPY . . 
RUN apt-get install libgtk2.0-0 libgtk-3-0 libgbm-dev libnotify-dev libgconf-2-4 libnss3 libxss1 libasound2 libxtst6 xauth xvfb
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
COPY --from=builder /app/packages/web/build client
COPY --from=go-builder /app/main .


CMD ["/app/main"]

