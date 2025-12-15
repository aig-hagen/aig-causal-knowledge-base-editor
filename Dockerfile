FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:1.29-20251215-901c70d
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
