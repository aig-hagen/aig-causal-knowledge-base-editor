FROM nginx:stable-alpine@sha256:9f5d22dc22e7d33129aa06c0837f5d6efaee07d369ff4a209e144382a950b2e9
COPY ./dist /usr/share/nginx/html
EXPOSE 80
ENTRYPOINT [ "/bin/sh", "-c"]
CMD ["echo \"$(envsubst '$TWEETY_API_URL' < /usr/share/nginx/html/index.html)\" > /usr/share/nginx/html/index.html && nginx -g \"daemon off;\""] 