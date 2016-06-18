FROM mhart/alpine-node:4.2
MAINTAINER Maximilian Lackaw <mlackaw@gmail.com>

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install --production

COPY . /usr/src/app

ENV PORT=3000

EXPOSE 3000

CMD ["node", "app.js"]
