## Notes about WebPack lectures
Important: When installing Webpack (we'll do that in one of the next lectures), run `npm install --save-dev webpack@3` because the latest version (version 4) has a slightly different syntax. 

So for the same config & code as shown in the videos to work for you, you need version 3.

If you want to update to Webpack 4.x, the following migration guide should help: https://dev.to/flexdinesh/upgrade-to-webpack-4---5bc5

## What is WebPack?
Webpack is more than just a bundler, but its main function is bundling multiple js, css, images into joint files & optimized images. for more details, see next section.

## How it works (behind the scenes)
1. entry point
    - root js app which mounts the app to the DOM. Dependency tree / graph starts from this root file.
    - Ex: app.js
2. output
    - here is where all the bundled files get stored
    - correctly ordered, concatenated output
3. loaders
    - applied on per-file basis (file-type dependent transofmations)
    - Ex: all js files get handled with blah... all css files... same thing
4. plugins
    - do things to the output bundled files (global transformations)
    - Ex: uglify

## Create your own Webpack workflow
- Basic Workflow Requirements
    - Compile next-gen javascript features to current-gen
    - Handle JSX
    - CSS Autoprefixing (simple css rules, get automatic prefixing)
    - Support image imports
        - as we did in create-react-app
    - Optimize code
        - shrink code to as small as possible
- in practice
    - `npm init` into folder
    - `npm install --save-dev <packages>`
        - `--save-dev` saves modules as development dependencies, which is typically for build workflow stuff, not for running application code.
        - install `webpack@3`
            - v3 because that's the version taught in the lectures. v4 is a bit different.
            - the build tool itself
        - install `webpack-dev-server`
            - install server locally on our machine