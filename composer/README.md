# Composer Tutorial Notes

What is Composer? Dependecy manager for PHP libraries, like npm for javascript

-   autoload all of your files and classes
-   website: https://getcomposer.org/

## Composer Intro

Purposes of lecture

-   How to install composer
-   Some basic composer commands
-   Install and use PHP packages with composer
-   update php packages
-   use composer autoload feature
-   create a package & upload it to online store

`composer init` - creates `composer.json` like a `package.json` file

-   dependencies, packages, etc

`composer search <search-string>` - searches for a library with your search string

-   Ex: `composer search php validation`
-   Can also search on https://packagist.org/

`composer require <package-name>`

1. download package
1. update `composer.json` file (or create it for you)
1. update `composer.lock` file (or create new file) (like `package-lock.json`)
1. Can also check if your system has the required software (ex: PHP version) to use that library

Before installing a specific package, you may want to go to `packages.org` to check out installation instructions

-   Ex: `composer require nesbot/carbon`

`composer install` - like `npm install`

-   creates `composer.lock` if it doesn't exist, but if it already exists, won't update it!

`composer update` - updates & installs dependencies in `composer.lock`

Some useful packages:

-   `swiftmailer/swiftmailer` - sending emails via PHP

8 - Auto-loading

add `"autoload"` to `composer.json`

-   key `"classmap": [ "path1/", "path2/", ... ]`
    -   Note: Classes in these directories need to be called the same as the filenames!
-   key `"files": [ "path1/file.php", ... ]`
    -   Autoload specific files (`require` them) on every request
-   key `"psr-4": { "Namespace\\": "path", ... }`
    -   PSR-4 Autoloader
    -   automatically load classes defined in "path" which are under namespace "Namespace"
        -   Note: If your namespace key is `""`, this will have composer look for ALL namespaces in that path
            -   If you do this, may have to dump autoload with `composer dumpautoload -o` - no explanation why, it's just making an optimized version of the autoload
            -   Note: you can also set `"config": { "optimize-autoloader": true }` in `composer.json` which does the same, always (not recommended in dev env, only in prd)
    -   "Namespaces" are basically php files inside a folder
-   Note: after updating `composer.json`, we need to inform composer we edited that file
    -   `composer dumpautoload` - to reload autoload file

9 - Installing Dev Dependencies

Example: `filp/whoops` - a nice package for error handling

`composer require filp/whoops --dev`

-   Places package in `"require-dev"` in `composer.json`

10 - updating dependencies with composer

`composer update` (checkes for package updates)

Note: Whenever you run this, your composer.lock file is updated, and if there's new versions of dependencies, they'll be updated to the newest version

-   This depends on if you specify versions as `^2.1` or `~2.1`, update will look fo versions LESS than `3.0.0` and automatically update them

To update `composer` to latest version, run `composer self-update`

11 - a few more useful commands

`composer remove <package>` (remove pkg from `composer.json` & `composer.lock`)

`composer update --lock` (updates `composer.lock` with dependencies from `composer.json`)

`composer update <package>` - updates specified package & that package in `composer.lock`
