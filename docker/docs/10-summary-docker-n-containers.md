# Docker & Containers - A Summary

161 - 168

Containers

-   Isolated, small, light-weight
-   Reproducible, shareable
-   usually focused on ONE task per container
-   stateless
    -   Data in container is lost when container is shutdown (unless you add volumes / bind mounts)
-   read-write layer on top of image

Images

-   Dockerfiles or via Docker Hub
-   Blueprints for containers
-   Code + environment
-   Read-only / does not run
-   Can be built + shared
-   Created with instructions (layers)
    -   can be cached / reused

Key commands

-   `docker build -t NAME:TAG .`
-   `docker run --name NAME --rm -d IMAGE` (+ more, obvioiusly)
-   `docker push REPOSITORY/NAME:TAG`
-   `docker pull REPOSITORY/NAME:TAG`
-   bint mounts: `-v /local/path:/container/path`
-   volumes: `-v NAME:/container/path` or `-v /container/path`

Container to container communication

-   Use container IP (bad - this might change over time)
-   Networks

Docker-compose

-   allows you to pre-define build and run configuration into a `.yml` / `.yaml` file
-   `docker-compose up`
-   `docker-compose down -v`

Local host (dev) vs remote host (prod)

-   many devs just use docker on local machines since this is nice and easy to share
-   also usable on production machines, just as it's useful between multiple devs

Deployment Considerations

-   Replace bind mounts with volumes or COPY
-   multiple containers might need multiple hosts
    -   can run on the same host (depends on application)
-   multi-stage builds help with apps that need a build step
-   keep aware of Control vs Ease-of-use
    -   Security consideration included here
