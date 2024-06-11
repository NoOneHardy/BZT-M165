FROM node:22 AS build

WORKDIR /ng

COPY package.json /ng/package.json
COPY src /ng/src
COPY angular.json /ng/angular.json
COPY tsconfig.json /ng/tsconfig.json
COPY tsconfig.app.json /ng/tsconfig.app.json

RUN npm install
RUN npm run build

FROM nginx:alpine AS final

COPY --from=build /ng/dist/frontend/browser /usr/share/nginx/html
COPY default.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
