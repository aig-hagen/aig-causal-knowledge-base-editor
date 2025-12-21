FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:1.29.0-preview
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
