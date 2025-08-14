FROM nginx:stable-alpine@sha256:ffa1b2237b1626cc23eb89e35d3944d514d28b2e568a2ce099c9d2e0871560bf
COPY ./dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "/bin/sh", "-c"]
CMD ["echo \"$(envsubst '$TWEETY_API_URL' < /usr/share/nginx/html/index.html)\" > /usr/share/nginx/html/index.html && nginx -g \"daemon off;\""] 