FROM php:7.4-fpm-alpine

# folder where our final application will be served from
WORKDIR /var/www/html

# needed for production, so snapshot of course code is available in the container
COPY src .

RUN docker-php-ext-install pdo pdo_mysql

# by default, this image doesn't give container access to write code
# change folder ownership (linux command)
# www-data is default-user for this image
RUN chown -R www-data: /var/www/html