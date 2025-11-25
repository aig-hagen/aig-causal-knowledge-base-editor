FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:causal-reasoner-snapshot@sha256:a562ce86766ffab5a73ccf5a004f8ddf275200381f1e3010eb4d9639699e2bb9
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
