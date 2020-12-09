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
        -   if container is removed, volume is also removed
    -   Named Volumes
        -   great for data which should be persistent between container shutdown
    -   Both...
        -   Linked path is managed automatically by docker

-   Bind Mounts (managed by you)
-   Both...
    -   A defined path in the container is mapped to the created volume/mount. e.g.: /some-path on your hosting machine is mapped to to /app/data

How to create named volume? when running container.

Add `-v volumeName:/path/to/persist/in/container` to add named volume to container in run command

Note: after stopping & rm & restarting a container, have to keep the above `-v ...` in the command!

Note: `docker volume prune` to remove all unused local volumes, or `docker volume rm <vol-name>` to remove only 1
