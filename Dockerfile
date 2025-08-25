FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:causal-reasoner-snapshot@sha256:d82c1fadf5b2351a9a9d46e53e1e1b57c9abd10220b21b4ad19dd9317300331f
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
