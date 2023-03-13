# Build package (install js depdendencies)
FROM node:16-alpine as package

WORKDIR /app

ADD package.json package.json
ADD yarn.lock yarn.lock

RUN yarn install

## Build storybook
FROM package as builder

WORKDIR /app
ADD . .
RUN yarn run build-storybook

### Build clean docker image with only needed files
FROM nginx:stable-alpine as production

COPY --from=builder /app/storybook-static /usr/share/nginx/html
ADD ./.docker/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
