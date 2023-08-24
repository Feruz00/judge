FROM alpine:latest

WORKDIR /app

RUN apk update \
&& apk add build-base \
&& apk add g++

COPY . /app/

RUN [ "chmod","+x", "./judge.sh" ]
ENTRYPOINT [ "./judge.sh" ]