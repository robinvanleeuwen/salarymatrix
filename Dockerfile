# DataMatrix Frontend.
FROM nginx:latest
WORKDIR /usr/share/nginx/html
COPY public .
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
