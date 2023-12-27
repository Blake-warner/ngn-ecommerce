FROM node:latest

WORKDIR /api
COPY ./dist/apps/store-api .
ARG PORT=3000
ENV PORT=$PORT

RUN npm install
# dependencies for nestjs
RUN npm install reflect-metadata rxjs tslib @nestjs/platform-express 
EXPOSE $PORT
CMD node ./main.js