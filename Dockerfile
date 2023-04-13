FROM node:18-alpine as build

COPY . /myhdf5
WORKDIR /myhdf5

RUN apk --no-cache add git \
  && npm install -g pnpm@7 \
  && pnpm install \
  && pnpm build


FROM nginx:alpine

COPY --from=build /myhdf5/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

RUN apk --no-cache add curl
COPY ./healthcheck /

EXPOSE 80

HEALTHCHECK --start-period=10s --timeout=5s --retries=3 CMD /healthcheck
