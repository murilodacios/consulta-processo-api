FROM node:alpine

RUN mkdir -p /usr/src/app
ENV PORT 3456

WORKDIR /usr/src/app

COPY package.json /usr/src/app
COPY yarn.lock /usr/src/app

RUN yarn install

COPY . /usr/src/app

RUN yarn build

EXPOSE 3456
CMD [ "yarn", "start" ]