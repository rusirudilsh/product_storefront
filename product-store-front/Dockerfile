# build
FROM node:lts-alpine as build
WORKDIR /storefront
COPY package*.json ./
RUN npm install
COPY . /storefront
RUN npm run build

# production
FROM nginx:stable-alpine as production
COPY --from=build /storefront/dist /usr/share/nginx/html
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]