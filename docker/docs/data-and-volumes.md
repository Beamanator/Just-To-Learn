## Managing Data & Working with Volumes

Volumes, Arguments, Environment Variables

Data categories

-   Application (Code + environment)
    -   written & provided by you (the dev)
    -   Added to image and container in build phase
    -   "Fixed" - can't be changed once image is built (since images are read-only)
    -   Read-only, hence stored in _Images_
-   Temporary App Data (Ex: user input)
    -   Fetched / produced in running container
    -   Stored in memory or temporary files
    -   Dynamic and changing, but cleared regularly
    -   Read + write, temporarily, hence stored in _Containers_
-   Permanent app data (ex: user accounts)
    -   Fetched / produced in runnign container
    -   stored in files or a database
    -   must not be lost if container stops / restarts
        -   Note: data should survive removal / deletion of container!
    -   Read _ write, permanent, stored with \_containers_ and **_Volumes_**

46 - Problem: By default, when container gets deleted, so do internal created files that were created by / in the container only. It's not because we stop & restart the container, it's because we _remove_ the container.

47 - Solution: Volumes

Volumes are folders on host machine (your computer) which are mounted (mapped) into your container(s) -> bidirectional

-   allows you to persist data, even after container is removed
-   containers can read & write data into a volume

48

How to add anonymous volume? instruction `VOLUME ["paths"]` -> array of paths **inside container** to persist

Initially, hit some node docker error running `docker run --rm -d -p 3000:80 feedback-app:volumes`, involving the `fs.rename` method

-   replace `fs.rename` with `fs.copyFile` and `fs.unlink`
-   aaaand... still not working

49

Types of external data storages

-   Volumes (Managed by Docker)

    -   Anonymous Volumes

        -   we don't assign name, docker automatically assigns crazy name
        -   Can be created in `Dockerfile` (with `VOLUMES`) or in `docker run` command
        -   if container is removed (`--rm`), volume is also removed
        -   Cannot be shared across containers
        -   created specifically for a single container
        -   since it's anonymous, it can't be reused (even on same image)
        -   CAN be useful for:
            -   Locking in certain data that already exists in the container (e.g. from `COPY` instruction) so data doesn't get overwritten by other volumes
            -   still create counterpart on host machine so data remains as long as container exists (can help with performance / efficiency) - e.g. a `/temp` folder

    -   Named Volumes
        -   great for data which should be persistent between container shutdown
        -   Cannot be created in `Dockerfile`
        -   Created in general - not tied to any specific container
        -   Survives container shutdown / restart & removal. To remove, have to use special DOcker CLI command
        -   Can be shared across multiple containers
        -   Can be re-used for same container (across restarts)
    -   Both...
        -   Linked path is managed automatically by docker

-   Bind Mounts (managed by you)
    -   path on local machine set by you (dev)
    -   Not tied to one specific container, can be tied to multiple containers
    -   Survive container shutdown / restart / removal
    -   To clear data, have to delete via host machine (can't use docker command)
    -   Can be shared across containers & can be reused for same container (across restarts)
-   Both...
    -   A defined path in the container is mapped to the created volume/mount. e.g.: /some-path on your hosting machine is mapped to to /app/data

How to create named volume? when running container.

Add `-v volumeName:/path/to/persist/in/container` to add named volume to container in run command

Note: after stopping & rm & restarting a container, have to keep the above `-v ...` in the command!

Note: `docker volume prune` to remove all unused local volumes, or `docker volume rm <vol-name>` to remove only 1

51 - Bind mounts

Problem: changing source code isn't reflected in container unless we rebuild the image (as learned previously)

Solution: Bind mounts

-   similar to volumes, but we know where they're mounted - dev sets internal path
-   We can put our source code here so that the container has access to latest code
-   perfect for persistent & **editable** data (ex: source code)

Creating bind mount:

`docker run -v /<pathOnHostMachine>:/<pathInContainer> ...`

-   Note: `pathOnHostMachine` needs to be absolute path, not relative! -> Note: can wrap path in `""` to make sure spaces in path don't cause problems
-   Note: Docker needs to have access to the folder you're sharing
    -   Docker -> Preferences -> Resoures -> File Sharing

53

If you use `COPY` in `Dockerfile`, AND use bind mount, your files from your local machine could override what's in the container

Solution? Anonymous volumes with more specific path

-   `-v /app/node_modules` (no name) in the `docker run` command
-   Note: same as using `VOLUME [ "/app/node_modules" ]` in `Dockerfile`

If there's multiple volumes with similar path, the longer internal path wins!

-   ex: if you have these two volumes, the second will win b/c it's "deeper" in the container (more specific):
    -   `-v "/Users/.../docker-app:/app"`
    -   `-v /app/node_modules` (node_modules is deeper)

So at this point, we have three volumes, explained here:

-   `-v feedback:/app/feedback`
    -   Named volume, persists feedback data somewhere on your machine, and in `/app/feedback` in the feedback volume
-   `-v "/Users/alexbeaman/Documents/Github/Just-To-Learn/docker/demos/44-data-volumes-01-starting-setup:/app"`
    -   Bind mount, persists source code in the container and on your local machine, where you specify
-   `-v /app/node_modules`
    -   Anonymous volume, overrides `/app/node_modules` so that data comes from `COPY` instruction in the image

54

In node server development, may way to use `nodemon` package to restart web server when any changes are made

Quiz 3: Volumes & Bind Mounts

1. What's a "Volume" (when working with Docker)?
    - A folder / file inside of a Docker container which is connected to some folder outside of the container
1. Volumes are managed by Docker, you don't necessarily know where the host folder (which is mapped to a container-internal path) is. (true)
1. Anonymous Volumes are removed when the container they're in is removed (true)
1. Named Volumes are useful because they survive container removal
1. A "Bind Mount" is a path on your host machine, which you know and specify, that is mapped to some container-internal path.
1. Bind Mounts are useful when you want to provide "live data" to the container (no rebuilding needed).
1. Anonymous volumes can be used to prioritize container-internal paths over external paths

56 - Read-only volumes

By default, volumes are read-write but can restrict that by adding `:ro` (read-only) after container-internal path when creating volume / bind mount

-   Ex: `docker run --rm -d -p 3000:80 --name feedback-app -v feedback:/app/feedback -v "/Users/alexbeaman/Documents/Github/Just-To-Learn/docker/demos/44-data-volumes-01-starting-setup:/app:ro" -v /app/temp -v /app/node_modules feedback-node:volumes`
    -   See `-v "...path:/app:ro"`, and notice we added `-v app/temp` anonymous volume so that we can overwrite that path as being editable (since the volume is read-write by default)

57 - managing docker volumes

`docker volume --help`

-   `ls` - list all volumes -> note: bind mounts don't show, since they're not managed by docker
-   `create` - manually create a volume (not common)
-   `prune` / `rm` - remove unused volumes or one individual volume
    -   **Warning**: all data in volume is lost if you remove it!
-   `inspect` - can see info like when created, name, mountpoint (path on host machine where this is stored, but it's within a basic virtual machine where Docker runs, so you won't be able to actually navigate there). Can also see options (like if volume is read-only)

58 - Using `COPY` vs Bind Mounts

We "Can" remove the `COPY . .` instruction from the `Dockerfile` if using a Bind Mount to bind the entire working directory to the container - since they're doing a similar step. However... In production you'll almost **never** use bind mounts, since the image & container will be on a server somewhere, and you won't be changing source code live. Therefore, it's maybe smart to keep `COPY . .` around so we can spin up production-ready containers

59, 60 - .dockerignore

Similar to `.gitignore` - specify which folders & files which should not be copied via a `COPY` instruction

-   Ex: `node_modules` - we most likely never want to copy this local file into your image

61, 63 - ARGuments & ENVironment Vars

ARGuments - build-time

-   Variables in `Dockerfile` to plug values into dockerfile instructures, based on args given by `--build-arg` when running `docker build`
-   Syntax: `ARG NAME=default` (default optional)
    -   Note: this can only used in build-time commands (not `CMD`, for example)
    -   Now just use as `$NAME`
-   Use these with `docker build -t myname:tag --build-arg NAME=value .`

ENVironment variables - runtime

-   Available in `Dockerfile` and ALSO in entire running application code
-   Syntax: `ENV PORT=80`
    -   Now this can be used elsewhere in `Dockerfile` via `$PORT`
-   in `run` command, can override the `ENV` with:
    -   `--env PORT=8000` (or `-e ...`) - if you want multiple, do `-e ... -e ...`
    -   `--env-file ./path-to-.env`
        -   Note: You'll also need a `.env` file with the environment variable(s)

Note about placement of `ENV` and `ARG`: Probably want to place them right before they're used, so the new layers can be cached.

Current full `run` command:

-   `docker strun --rm -d -p 3000:8000 --env-file ./.env --name feedback-app -v feedback:/app/feedback -v "/Users/alexbeaman/Documents/Github/Just-To-Learn/docker/demos/44-data-volumes-01-starting-setup:/app:ro" -v /app/temp -v /app/node_modules feedback-node:env`

62 - ENV security

`docker history <image>` can allow you to see instructions run in your images, so don't store private / secret ENVs in `Dockerfile`! instead, store in `.env` or directly in `run` command

64 - Summary

Containers can read + write data, Volumes can help with data storage, Bind Mounts can help with direct container interaction

... and more (nothing exciting)
