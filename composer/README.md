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

## Creating and publishing Library

When preparing `composer.json` for https://packagist.org/...

-   `name` should be lowercase, words separated by `-`.
-   `description` is your basic package description
-   `keywords` can help devs find your package
    -   Ex: `["Json", "Response", "API Response Class"]`
-   `license` is library license
    -   Ex: `"MIT"`
-   `type` is project type
-   `authors` is array of author objects, each containing `name`, `email`, `homepage`
-   `require` is for packages & specifying php version
    -   Ex: `">=5.3.0` to use `json_encode` function

Git setup recommended (maybe needed)

-   Add tag to commit with version number so Packagist knows where versions come from
    -   `git tag #.#.#`

Next, submit github repo on Packagist

-   You'll be able to see some info from `composer.json` and README.md, and existing versions (tags from Github)

Github -> Settings -> Integrations & services -> Packagist

-   enter User & Token (Packagist profile -> show API token) & Domain (packagist.org by default, so don't need to fill it out)
-   Click Manage Packagist, "Test service", then go to Packagist and make sure the auto-update warning is gone - meaning we're now setup!

After updates, push to Github (+ update tag)

-   Now you should see the new updates in Packagist

## Advanced concepts in Composer

21 - scripts & listening to composer events

callbacks for before / after installing scripts

-   https://getcomposer.org/doc/articles/scripts.md
-   multiple types of events (command events, installer events, package events, plugin events...)

Setup in `"scripts"` key of `composer.json`

Note: can also put php scripts directly in a string in one of the `"scripts"`

-   And can create custom scripts and run them with `composer <script-name>`
-   can even link scripts to separate files!! :O
-   Can even have a script set to an array of scripts, any combination of the above
