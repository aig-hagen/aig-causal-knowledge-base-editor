FROM nginx:stable-alpine
COPY ./dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "/bin/sh", "-c"]
CMD ["echo \"$(envsubst '$TWEETY_API_URL' < /usr/share/nginx/html/index.html)\" > /usr/share/nginx/html/index.html && nginx -g \"daemon off;\""] 