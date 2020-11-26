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

## Front Matter

-   Metadata at the top of Markdown files - not the content itself.
-   Stored in key-value pairs (usually or always)
-   Can be written in YAML, TOML, or JSON
-   Can be used by Hugo templates & themes to help display your information / content
-   Can add custom key / value pairs on top of the default ones created on new pages
-   Default front matter key / value pairs are setup in `archetypes/default.md`

## Archetypes

-   `default.md` sets base front matter for all content - unless overridden per directory
-   `<dirName>.md` sets base front matter for all content \*\*inside `/<dirName>`
-   Question: What if you make a folder with a `.md` file in this `archetypes` folder? Ex: `dir1/dir2.md`

## Short-codes

Code that grabs some pre-defined html and throws it in your content page

-   Format: `{{< shortcode-name param1 >}}`

Examples from hugo (yes you can make custom shortcodes somehow)

-   `{{< youtube 2xkNJL4gJ9E >}}`
-   More here: https://gohugo.io/content-management/shortcodes/

## Taxonomies

_Hugo includes support for user-defined groupings of content called taxonomies. Taxonomies are classifications of logical relationships between content_ [source](https://gohugo.io/content-management/taxonomies/)

Always added to content in front matter

Default taxonomies:

-   Tags
-   Categories

Create custom taxonomies:

1. Add front matter like `tags` and `categories`
1. In `config.toml`, add your new taxonomy under `[taxonomies]`. Like this:
    ```toml
    [taxonomies]
        tag = "tags"
        category = "categories"
        mood = "moods"
    ```
    - Note: If you define `[taxonomies]` in `config.toml`, you **must** include `tag` and `category` for them to work!

Note: any time you modify `config.toml`, restart your server!

## Templates

-   Templates go in `/layouts`
-   Multiple types: `list.html`, `single.html`, custom (home, section, base)
    -   list and single and base go in `/layouts/_default` - overwrite theme templates!
-   Home page template is at `/layouts/index.html`
-   Section templates are at `/layouts/<folder>/<template-name>`
    -   Can do `/layouts/dir1/list.html` to overwrite the list templates in `dir1` directory, as an example
-   Base templates
    -   `layouts/_default/baseof.html`
        -   Used in list AND single templates!

### Partial Templates

-   Kinda like components in React - can be injected into other templates
-   Folder within `layouts` called `partials`
    -   Ex: `/layouts/partials/header.html`
    -   Ex: Something as basic as...
        ```html
        <h1>{{.Title}}</h1>
        <p>{{.Date}}</p>
        <hr />
        ```
-   Importing from other files
    -   `{{ partial "header" . }}`
        -   `.` = passed scope into header (`.` represents entire scope of variables (global?))
    -   Passing a dictionary w/ your custom variables
        -   `{{ partial "header" (dict "myTitle" "myCustomTitle" "myDate" "myCustomDate") }}`
        -   Should be key-value pairs

## Blocks (in base templates)

Define a block in `baseof.html` (for example)

```
{{ block "main" . }}
    Default content
{{ end }}
```

Use the block in a different file (ex: `single.html`)

```
{{ define "main " }}
    Some content here gets shoved in block "main"
    <p>Even P's here!</p>
{{ end }}
```

## Hugo Variables

[Docs](https://gohugo.io/variables/)

... Should go through the docs to dive deep into what variables are available

-   Can only be used / accessed within `layouts` folder, can't use it within `content` folder!
-   Syntax: `{{ .VariableName }}`
    -   Ex: `{{ .Title }}`, `.Date`, `.URL` (from front-matter)
-   Custom variable from frontmatter
    -   in frontmatter: `myVar: "myValue"`
    -   in template: `{{ .Params.myVar }}`
-   Custom variables
    -   create variable `{{ $myVarName := 3 }}` (or string or boolean)
    -   use variable `{{ $myVarName }}`

## Hugo Functions

-   Only work in `/layouts` folder
-   General format for functions: `{{ funcName param1 param 2}}`
-   Examples:

    -   `{{ truncate numChars longString }}`
    -   `{{ sum 1 4}}`
    -   `{{ singularize "dogs" }}`
    -   ```
        {{ range .Pages }}
            {{ .Title }}</br>

        {{ end }}
        ```

## Hugo Conditionals

[source](https://gohugo.io/templates/introduction/#conditionals)

-   Falsy vaules (in Go, therefore also in Hugo):
    -   false (boolean)
    -   0 (integer)
    -   any zero-length array, slice, map, or string
-   Structure: `{{ if <operator> <condition> }} ... {{ else }} ... {{ end }}`
-   Examples:
    -   `{{ if eq $val1 $var2 }}`
    -   `{{ if not (eq $val1 $var2) }}`
    -   `{{ if and (lt $val1 $var2) (lt $var1 $var3) }}`
    -   `{{ if eq $val1 $val2 }} ... {{ else if ... }} ... {{ end }}`
    -   Use conditionals w/ `range` function
        ```
        {{ $title := .Title }}
        {{ range .Site.Pages }}
        <li>
            <a
                href="{{ .URL }}"
                style="{{ if eq .Title $title }}background-color:yellow;{{ end }}"
            >
                {{ .Title }}
            </a>
        </li>
        {{ end }}
        ```
    -   `with`, `isset` are in docs but not in video! :O
-   Operators:
    -   `eq` (equal to)
    -   `lt` (less than)
    -   `le` (less than or equal)
    -   `gt` (greater than)
    -   `ge` (greater than or equal)
    -   `not` (negate the condition)
    -   `and` (join two conditions - both must be true)
    -   `or` (duh)
    -   more!? Check docs!

## Data files / directory [vid 20]

[source](https://gohugo.io/templates/data-templates/#the-data-folder)

Any "data" for website (kinda like mini db)

-   JSON, YAML, TOML files (similar type of content as in frontmatter)
    -   Ex: us state capitals JSON file (cuz why not?)
-   Loop through data
    -   Ex: supposed you have a `data/states.json` file with props `name`, `lat`, `long`, etc.
        ```
        {{ range .Site.Data.states }}
            {{.name}} <br> {{.lat}}
        {{end}}
        ```

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
