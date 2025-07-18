FROM nginx:stable-alpine@sha256:d83c0138ea82c9f05c4378a5001e0c71256b647603c10c186bd7697a4db722d3
COPY ./dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "/bin/sh", "-c"]
CMD ["echo \"$(envsubst '$TWEETY_API_URL' < /usr/share/nginx/html/index.html)\" > /usr/share/nginx/html/index.html && nginx -g \"daemon off;\""] 