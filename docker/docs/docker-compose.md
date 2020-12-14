# Docker Compose: Elegant Multi-Container Orchestration

Docker is a tool that allows you to replace multiple `docker build` & `run` commands with one configuration file, and some "Orchestration commands" (`build`, `start`, `start`).

Note: on linux, there's special steps to install docker-compose

Can be used with single-container application, but more helpful for multi-container applications on the same host

Does NOT:

-   Replace `Dockerfile`
-   Replace Images or Containers
-   Is not suited for managing multiple containers on different hosts (machines)

Services (containers)

-   published ports, env variables, volumes, networks, etc. Basically everything you can do with docker commands in the terminal

92, 93 - Creating a compose file & configuring

File: `docker-compose.yml` (or `.yaml`)

-   Docs: https://docs.docker.com/compose/compose-file/

Note: Docker extension (in visual studio code) is helpful for auto-completion

Pieces of the file:

-   `version: ""` - version of `docker-compose` specification we want to use in this file, not version of our app

-   `services: ...` (multi-services allowed)
    -   Needs at least one child, maybe multiple
    -   Note: names here (ex: `backend`) may be converted to something else by docker-compose, when running `docker ps -a`, but your original name can be used for connections / communicating between containers
    -   Children are `containers`
        -   You can choose what to name your containers
        -   `image: <image-name>` (can be from docker hub or locally)
            -   pre-built image, not a `Dockerfile`!
        -   `container_name: <name>`
            -   Can manually set container name
            -   if this is not set, Docker will automatically set names based on folder & service name
        -   `volumes: ...` (multi-volumes allowed)
            -   `- data:/data/db` -> Put exactly what we had in `docker run` for volumes
            -   **Note**: For each named volume you create, add the name of the volume to `volumes` key below / "next to" `services`
        -   `environment: ...` (multi-envs allowed)
            -   Syntax 1: `MY_VAR: value`
            -   Syntax 2: `- MY_VAR=value`
        -   `env_file: ...` (multi-env-files allowed)
            -   `- ./relative-path-to-env-1.env`
            -   `- ./relative-path-to-env-2.env`
        -   `build: ...`
            -   Used to point to another `Dockerfile` on your machine. Can be a simple path, or you can add settings like `context`, `dockerfile`, `args`
        -   `ports: ...` - pretty basic, just a list of ports (`- localmachine:containerport`)
        -   `depends_on: ...`
            -   When one container depends on another container being up and running at the same time as another
        -   `networks: ...` (multi-networks allowed)
            -   Note: **not NEEDED** b/c docker-compose automatically creates & adds all containers to a network
        -   interactive mode
            -   enable `-it` with BOTH `stdin_open: true` and `tty: true`
        -   Don't need `--rm` because when services go down, they are automatically removed (by default)
        -   Don't need `-d` because they start in detatched mode by default
-   `volumes: ...` (multi-volumes allowed)
    -   Need to have all named-volumes listed here, like this:
        -   `data:` (yes, with `:` and with no value)
    -   Note: if multiple services use the same named volume, it will be the same path in the local machine
    -   Anonymous volumes & bind mounts do not need to be specified here

95 - docker compose up and down

`docker-compose up`

-   starts everything up, attached by default
-   shut 'er down with `ctrl + c`
    -   Note: add `-d` for detached mode
-   `--build`
    -   forces images to be rebuilt before starting containers
    -   Note: if you changed some code & need the images to be rebuilt, this may be necessary!

`docker-compose build`

-   builds / rebuilds all custom images defined in `docker-compose.yml` file
-   doesn't automatically start any containers

`docker-compose down`

-   deletes default network, containers, etc.
-   Doesn't delete volumes - unless you add `-v` at the end
