FROM nginx:stable-perl

WORKDIR /app
COPY dist .
RUN ls -la
RUN cp -r /app/* /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
