# Build package
FROM node:12-alpine as package

WORKDIR /app

ADD package.json package.json

RUN yarn --only=prod

## Build vuejs
FROM package as builder

ARG ENVIRONMENT

WORKDIR /app
ADD . .
RUN yarn run build --mode $ENVIRONMENT


#### Build clean docker image with only needed files
#FROM nginx:stable-alpine as production
#
#COPY --from=builder /app/apps/accounts/ui/dist /usr/share/nginx/html
#ADD ./apps/accounts/ui/.docker/default.conf /etc/nginx/conf.d/default.conf
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]