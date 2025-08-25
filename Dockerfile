FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:causal-reasoner-snapshot
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
