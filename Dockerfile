FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 8119

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install

COPY . /usr/src/app

RUN yarn build

EXPOSE 8119
CMD [ "yarn", "start" ]