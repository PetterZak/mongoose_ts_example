FROM node:10-alpine

ENV NODE_ENV production
RUN mkdir -p /usr/app
WORKDIR /usr/app

COPY package.json /usr/app

RUN apk add --no-cache --virtual .build-deps make gcc g++ python \
    && npm i -g ts-node typescript \
    && npm install --production --silent \
    && apk del .build-deps

COPY ./src /usr/app/src
COPY tsconfig.json /usr/app

EXPOSE 3000
CMD ["npm", "start"]