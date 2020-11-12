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
-   `hugo new <pah-to-new-file.md>` - create new file at exact path
    -   Note: themes MAY have specific folders where content needs to go! Depends on theme setup
-   `hugo server` - spin up the hugo server
    -   add `-D` to display content in `draft` format

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
    -   connect theme: `theme = "folder-name-in-theme-dir"`

## Other thoughts / notes

Pre-built themes:

-   https://themes.gohugo.io/

Content types:

-   Single Pages
    -   Page that displayes one single page content
-   List Pages
    -   Pages that list out links to other content
    -   These are created for the first level of folders in `/content` by default
        -   To make these pages for deeper dirs, add `_index.md` to that dir. You can even add content to this `_index.md` list page if you want
        -   You can overwrite the default with `_index.md` at that level, with your own custom content
