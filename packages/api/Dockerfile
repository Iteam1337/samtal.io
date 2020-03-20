FROM node:12.16-alpine as base
ARG cache=1

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY /lib ./lib
COPY /migrations ./migrations
COPY /scripts ./scripts

COPY tsconfig.json ./

RUN npm run build

FROM node:12.16-alpine

ENV USER=api-user
RUN adduser --disabled-password --gecos "" $USER

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY --from=base /app/build ./build
COPY --from=base /app/migrations ./migrations
COPY --from=base /app/scripts ./scripts

USER $USER

CMD npm start