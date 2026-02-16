FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:1.29.0-preview.2@sha256:66242050ad405ffb0f2242e1c26edd12658898bec79d263c85870baa6b298cdc
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
