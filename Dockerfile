FROM nginx:stable-alpine-slim@sha256:6d4f5fb02763f731c06f3e246d4edf89c3a2bbc5dd72eab2b02bc55ef4b8600e
COPY ./dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]