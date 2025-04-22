FROM nginx:stable-alpine@sha256:1eadbb07820339e8bbfed18c771691970baee292ec4ab2558f1453d26153e22d
COPY ./dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "/bin/sh", "-c"]
CMD ["echo \"$(envsubst '$TWEETY_API_URL' < /usr/share/nginx/html/index.html)\" > /usr/share/nginx/html/index.html && nginx -g \"daemon off;\""] 