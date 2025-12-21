FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:1.29.0-preview.1@sha256:3f396fc517d0a039c0f72f149764dc5a64a2d8f3c22b6c78ef8dbaa33756dfd1
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
