FROM ghcr.io/odzhychko/tweetyproject/tweetyproject-web-server:causal-reasoner-snapshot@sha256:425444d8988f9c4c0533383a405fec9eeca3df52bbf7dbab7344f98899c181ed
COPY ./dist/ /workspace/BOOT-INF/classes/static/
EXPOSE 8080
