FROM nginx:stable-alpine-slim@sha256:b72dec66dea425356956e863bfbccca6c1f8748f5913e094d4ca20b71e4ba2c3
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]