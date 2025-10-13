# FROM nginx:stable-perl
# important for openshift
FROM registry.access.redhat.com/ubi9/nginx-120

# copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# set working directory
# WORKDIR /app

# copy build files
COPY dist /usr/share/nginx/html

# copy all files to nginx html directory
# RUN mv /app/* /usr/share/nginx/html

USER root
RUN mkdir -p /tmp/nginx && chmod -R 777 /tmp/nginx
USER 1001   
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]
