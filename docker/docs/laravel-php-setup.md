# A More Complex Setup: A Laravel & PHP Docker Setup

Why Laravel & PHP?

1. So far we've only been doing node setup
1. Laravel is the most popular PHP framework
1. Laravel + PHP is a pretty complex setup, much more than just node
    - Ex: Needs server setup NOT written in PHP

Target setup

-   Host Machine (Source Code Folder)
-   App Containers
    -   PHP Interpreter (working with source code)
        -   running and executing PHP code (and therefore laravel code)
    -   Nginx web server
        -   takes incoming requests & trigger PHP interpreter
    -   MySQL Database
-   Utility Containers (all working with our source code)
    -   Composer
    -   Laravel Artisan
    -   npm (for a bit of js code)

Some commands we ran:

-   `composer create-project --prefer-dist laravel/laravel ...`
    -   Creating initial laravel project, using our custom `composer` image
-   `docker-compose up -d server php mysql`
    -   Starting up only specific services we want to start, in our `docker-compose.yml` file
-   `docker-compose up -d --build server`
    -   after adding `depends_on:` in `docker-compose.yml`, we can just specify 1 service, and it will bring up the other services it depends on
    -   Note: the `--build` makes `docker-compose up` try to rebuild images, if needed - otherwise, this won't happen by default
-   `docker-compose run --rm artisan migrate`
    -   Use `artisan` utility container to check if database / migration stuff is setup correctly

Notes:

-   PHP dockerfile doesn't end with `CMD`, which means the `CMD` of the **base image** will be run, if there is any
-   When creating a bind mount, if you add `:delegated` at the end (where `:ro` can go), updates are batched when going back / forth between the container and the host machine, improving performance a bit
-   Installing laravel via composer
    -   https://laravel.com/docs/8.x/installation#installation-via-composer
-   You can add `working_dir` and `entrypoint` in your `docker-compose.yml` file if you want, which would override those instructions in the `Dockerfile` - even if they don't exist there!
    -   Note: some instructions like `COPY` and `RUN` aren't available in `docker-compose.yml`
-   Some error I hit, and its resolution:
    -   > Service 'php' failed to build : The command '/bin/sh -c chown -R www-data:www-data /var/www/html' returned a non-zero code: 1
    -   resolution: close & re-start Docker (maybe twice)

One important thing about bind mounts: they're GREAT for development, but they're not an option if you plan to deploy a container!
