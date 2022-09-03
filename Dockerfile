FROM node:18.2.0 AS build-step
WORKDIR /build
COPY ./client ./
RUN yarn install
ENV NODE_OPTIONS="--max-old-space-size=2048"
RUN yarn build

FROM node:18.2.0
WORKDIR /app
COPY . .
COPY --from=build-step /build/build /app/build
RUN yarn install
EXPOSE 5000
CMD yarn start