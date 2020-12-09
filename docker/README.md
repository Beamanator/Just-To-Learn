# Docker

Guide:

-   Udemy: https://www.udemy.com/course/docker-kubernetes-the-practical-guide

## Docker Images vs Containers: The Core Building Blocks

-   Images are like the blueprints (just code 'n setup, the "meat")
-   Containers are like the houses (running instances of the images)

Virtual Machines vs Docker Containers

-   Virtual machines are all individual machines, so all require RAM, hard drive space, etc.
-   Docker containers are all running inside only 1 virtual machine

### Getting Images

19

-   Download online from: hub.docker.com
    -   Example: official `node` docker image
    -   `docker run node` -> uses the `node` image from docker hub, and creates a container with the `node` image
        -   first tries to get the image locally, then looks on dockerhub & downloads
        -   can give user access to interactive env if we use `docker run -it node`
-   By default, a container is isolated from its environment, so it's not necessarily automatically exposed to the user
-   Check for running containers with `docker ps`
    -   `docker ps -a` shows running and stopped containers

20-21

Usually we build on top of existing images to create our own images

Start by making a file `Dockerfile`, which will contain instructions for Docker when we build our own image - **setup** instructions for an image. (not to "run" code in the container)

`FROM` -> allows you to build an image from another base image (like `node`)

`WORKDIR /app` -> sets working directory of docker container

`COPY . /app` -> which files from local machine should go into image?

-   First path (`.`) is where, _outside_ of the image, your code should be copied from, into the image
-   Second path (`./` or `/app`) is path _inside_ the image where the files should be stored / copied into
    -   Note: path is **relative** to current working directory (`WORKDIR`) if you use `./something`

`RUN npm install` -> Note: had to set `WORKDIR` above to make sure we're installing in the correct working directory

`EXPOSE #` -> document which port is exposed to our local machine - ex: `EXPOSE 80`

-   best practice to keep this, but optional
-   Also need to add `-p` (publish flag) - under which local port the internal docker container port should be accessible
    -   `-p localPort:internalContainerPort`
    -   ex: `-p 3000:80`

Don't do `RUN node server.js` here!! This code will not run on every container, only when setting up the image!

-   Instead, run `CMD <command>`
    -   This isn't run when the image is created, but when a container is created based on the image
    -   Example: `CMD ["node", "server.js"]`
    -   Note: if you don't have `CMD`, the `CMD` of the base image will run
    -   This should always be your last line of your `Dockerfile`

22

How to run the custom image

`docker build .`

-   create a new, custom Image based on the `Dockerfile`
-   `.` means your `Dockerfile` is in the current directory

You'll see `"Successfully built <image-id>`

Next, Run the container with `docker run <image-id>`

-   Note: expose / publish a port with `-p localPort:containerPort` flag
-   Ex: `docker run -p 3000:80 <image-id>`

Stop a container with `docker stop <name>`

23

Note: Whenever running a docker command using an id, you don't have to write out the full id - you just have to write the first few letters to be unique

-   Ex: if you have ids `abcdwfwe` and `aweoifna` you'd need to at least write two letters of the id, so it's unique

24

Say you want to edit your image. Can you just edit your project code and re-run the container? **NOPE!** The source code is part of the image you built, so you have to re-build a **NEW** image. Images are basically _read-only_ and locked once you build them

25

Image Layers

When an image builds, it caches each step, so when you re-build, it can use the cache (if the step hasn't changed since last build)

-   This is called Layer-based architecture
-   Every instruction represents / creates a "layer" in your `Dockerfile`, and these are cached
-   Images are build from multipe "instructions"
-   Running an image (as a container) adds an addional layer

If you change something (like source code), you'll notice that step / layer takes longer to build, because it doesn't come from the cache

Note: when a step changes, all steps after that one have to also be re-run when building the image again.

-   Therefore, it's useful to `COPY package.json .` then `RUN npm install` before copying the rest of your code - `COPY . .`

26

Running a container doesn't copy code into it, it just adds a layer on top of the image (cpu resources, for example) to get it running

Quiz 1: Images & Containers

1. What are "Images" (when working with Docker)?
    - Images are "blueprints" for containers which then are running instances with read and write access.
2. Why do we have "Images" and "Containers"? Why not just "Containers"?
    - This concept allows multiple containers to be based on the same image without interfering with each other.
3. What are "Layers" in the context of images?
    - Every instruction in an image creates a cacheable layer - layers help with image re-building and sharing.

### 27 - Managing images & containers

Tip: Add `--help` in the cli to see other options on any command

28 - Stopping & restarting containers

Useful commands

-   `docker ps` - see running containers
    -   `docker ps -a` - see ALL containers
-   `docker run <image>` - create new container based off of an image
    -   container is running in the _foreground_, so terminal gets "blocked"
    -   default running in "attached" mode
    -   Can add `-d` to start in "detached" mode
-   `docker start <container-name>`
    -   terminal doesn't get "blocked" -> container is running in the _background_!
    -   default running in "detached" mode
    -   can add `-a` flag to start in attached mode
-   `docker attach <container-name>` will attach the terminal to a container
-   `docker logs <container-name>` will show all past logs for given container
    -   Can add `-f` to reattach to that container

"attached" simply means we're listening to the output of the container (ex: what's being printed to the console)

31

If you want to provide input into your container (like python reading data from the command line), use the `-i` flag. You'll also usually want to add the `-t` flag which sets up a pseudo-terminal for you. Note: you can combine `-i` and `-t` like this: `-it`

`docker run -it <image-id>`

Now when your container stops and you want to re-start it, doing `docker start -a <container-name>` sometimes acts weird, you should add `-i` as well. `docker start -ai <container-name>`

32 - Deleting images and containers

`docker rm <container-name-1> <container-name-2> <...>` removes a container, but it needs to be stopped first.

`docker container prune` removes all stopped containers

`docker images` lists all images on your computer

`docker rmi <image-id>` deletes that image & layers within that image

-   Note: You cannot remove images used by any container, even if that container is started or stopped!
-   `docker image prune` removes all unused images at the same time
    -   May need to add `-a` to prune tagged images

Add `--rm` to `docker run` command -> removes the container when it is stopped

34 - Inspecting images

`docker image inspect <image-id>` - inspect a single image

Some things you can see: creation date, expost ports, environment variables, entry point, docker version, operating system, Layers (commands) and much more.

35

Copy files / folders into / out of a running (or stopped) container

Why?

-   Maybe if source code changes (which usually requires rebuilt image & container) so you can copy it into your container. This isn't great though, since things could easily get confusing
-   Configuration files for a web server
-   Copying files outside of a container may be more interesting (ex: log files)

`docker cp sourcePath <container-name>:containerPath` - copy file / folder(s) into container

-   `sourcePath` is the path to your file / files locally.
    -   Note: `sourcePath/.` gets everything inside the folder
-   `containerPath` is the path your file / folder gets copied to, inside the container

`docker cp <container-name>:containerPath targetPath` - copy file / folder(s) from container to local

-   `targetPath` is the path on your local machine

36

Naming & tagging images & containers

-   `docker run --name <whatever-name> <image-id>` - add a name to a container
-   `docker build -t <name:tag> .`
    -   Image tags have: `name:tag` - can be set in `FROM` layer of `Dockerfile`
    -   Name / Repository: can set up generic name of your image - group of possible more specialized, images (ex: `node`)
    -   Tag: defnies a specialized image within a group of images (ex: `14`, `latest`)
