FROM node:alpine

WORKDIR /var/app

COPY ./package.json .

RUN yarn

COPY . .

CMD ["yarn","start"]