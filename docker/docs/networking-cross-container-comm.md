# Networking: Cross-Container Communication

How to use networks from within containers

-   How to let containers talk to each other, plus have containers reach out to WWW
-   Kinds of networks, where you may want to send requests to, from inside containers

67 - 73

Let's say we want to send GET http request to api (for example)

Types of inter-communication in dockerized app

1. to WWW (api online)
    - Ex: GET requests to public API
    - Out of the box, containers CAN communicate with WWW -> websites / apis online
1. Container to local host machine communication (like local database)
    - Ex: running `mongodb` on `localhost:3001`
    - Only need to replace `localhost` with `host.docker.internal` - understood by docker, and translated to ip address of host machine, as seen from inside docker container
1. Container to container communication
    - Ex: SQL database in a different container
    - Use IPAddress of running container
        - Say you have created an image from official mongo image on Dockerhub: `docker run -d --name mongodb mongo`
        - `docker container inspect <container-name>`, then look for NetworkSettings -> IPAddress
        - Doable, but cumbersome. Also, have to create new image when mongodb ip address changes, so try the other easier way :)
    - OR Use container networks (see section 74)!

Note: with first few examples, instructor installed Mongodb on his local machine (https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)

74 - Container (Chest) Networks

`docker run --network my-network ...`

-   All containers in a network can talk to each other by referencing other container names
    -   docker automatically does ip-lookup stuff (see above)
    -   Note: networks will not be _automatically_ created for you!

create a network: `docker network create favorites-net`

Now use container name in network domain (like `mongodb://mongodb:port/...`)

-   Note: this only works if BOTH containers are in the same network!

starting mongodb container: `docker run -d --name mongodb --network favorites-net mongo`

starting favorites container: `docker run -d --name favorites --rm -p 3000:3000 --network favorites-net favorites-node`

-   Note: don't need to publish a port unless we plan to connect to this container outside of the container network / from localhost machine

75 - Note about auto-IP resolving

Note: When you use a `<container-name>` or `host.docker.internal` as an address, Docker does **NOT** replace your source code, it simply detects **outgoing requests** and resolves the IP for such requests, and replaces it with actual IP address (possible since everything is running in a Docker environment)

Quiz 4

1. By default, your containers (and the apps inside of them) can reach out to the web and send requests.

76 - Docker Network Drivers

> Docker Networks actually support different kinds of "Drivers" which influence the behavior of the Network.
>
> The default driver is the "bridge" driver - it provides the behavior shown in this module (i.e. Containers can find each other by name if they are in the same Network).
>
> The driver can be set when a Network is created, simply by adding the `--driver` option.
>
> `docker network create --driver bridge my-net`
>
> Of course, if you want to use the "bridge" driver, you can simply omit the entire option since "bridge" is the default anyways.
>
> Docker also supports these alternative drivers - though you will use the "bridge" driver in most cases:
>
> **host**: For standalone containers, isolation between container and host system is removed (i.e. they share localhost as a network)
>
> **overlay**: Multiple Docker daemons (i.e. Docker running on different machines) are able to connect with each other. Only works in "Swarm" mode which is a dated / almost deprecated way of connecting multiple containers
>
> **macvlan**: You can set a custom MAC address to a container - this address can then be used for communication with that container
>
> **none**: All networking is disabled.
>
> **Third-party plugins**: You can install third-party plugins which then may add all kinds of behaviors and functionalities
>
> As mentioned, the "bridge" driver makes most sense in the vast majority of scenarios.

77 - Summary
