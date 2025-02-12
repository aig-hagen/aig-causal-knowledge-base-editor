FROM nginx:stable-alpine-slim@sha256:e22e10bd833136245b39ffeb1a0d7c672f5597c18df4c462f327cc44fe0aa7a8
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]