FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:1.29-20251215-901c70d@sha256:01e157c62c381523ca06c774b91e484bb2f9cf06d5245af7978b37338a424783
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
