FROM node:16.11.1

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install
COPY bin /usr/src/app/bin
COPY app.js /usr/src/app/
COPY routes /usr/src/app/routes
COPY services /usr/src/app/services
COPY utils /usr/src/app/utils
COPY views /usr/src/app/views

EXPOSE 3000

CMD npm start
