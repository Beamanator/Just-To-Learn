FROM composer:latest

WORKDIR /var/www/html
# WORKDIR /utils

ENTRYPOINT [ "composer" ]
# ENTRYPOINT [ "composer", "--ignore-platform-reqs" ]