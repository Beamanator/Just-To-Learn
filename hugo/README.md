# Hugo

## Links

Main site: https://gohugo.io/

First tutorial: https://www.youtube.com/watch?v=qtIqKaDlqXo&list=PLLAZ4kZ9dFpOnyRlyS-liKL5ReHDcj4G3

## Why use?

1. Extremely fast at making static websites (main selling point) - written in Go

## Dynamic vs Static

-   Dynamic: Example = Facebook. Your site is custom to you
-   Static: WYSIWYG (what you see is what you get) - everyone gets same page, no matter who / where / what you are

## Hugo does _static_ sites

-   You **can** make a site with NO HTML - just Markdown files - using dozens of provided themes
    -   But you can **iff** you want to!

## Useful commands

-   `hugo new site <your-site-name>` - create new hugo site template

## Initial hugo folders / files

-   `/archetypes` (advanced) - common content type(s) on your site
    -   ex: author on pages, languages, etc (like metadata)
-   `/content` - all content for your site
    -   ex: blog posts, weg pages, etc
-   `/data` - database for site (ish)
    -   ex: json file with data, maybe more
-   `/layouts` - common html pieces for multiple pages
    -   ex: header and footer on every page of website
-   `/static` - like assets, stuff that doesn't change ever
    -   ex: stuff that doesn't change - css, js, images
-   `/themes` - pre-built theming / layouts / templates
    -   ex: download pre-built theme and put it here
-   `config.toml` - main settings page for site
    -
