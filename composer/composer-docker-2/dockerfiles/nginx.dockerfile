# NOTE: this DOCKERFILE is useful as a production image, since
# it copies setup & code without using a bind mount!
FROM nginx:stable-alpine

WORKDIR /etc/nginx/conf.d

COPY nginx/nginx.conf .

# rename file
RUN mv nginx.conf default.conf

WORKDIR /var/www/html

COPY src .

# webserver gets started by default CMD from image