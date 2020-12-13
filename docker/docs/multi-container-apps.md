# Building Multi-Container Applications

79 - 89

Plans:

-   Combining multiple services to one application
-   Working with multiple containers

Three building blocks:

1. Database (mongodb)
1. Backend (NodeJS REST api)
1. Frontend (React SPA)

Three containers:

Pre-setup: `docker network create goals-net`

-   `docker run --name mongodb -v goalsdata:/data/db -d --rm --network goals-net -e MONGO_INITDB_ROOT_USERNAME=addy -e MONGO_INITDB_ROOT_PASSWORD=secret mongo`
    -   Note: needs `-p 27017:27017` if services accessing this container (not in the same network) need to access that port
    -   Note: data gets stored to `/data/db` within container [source](https://hub.docker.com/_/mongo)
    -   Note: to add security, `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` environment variables can be added so the server has to connect with those creds
-   Start with `/backend/Dockerfile` (and `.dockerignore`)
    -   `docker run --name goals-node -d --rm -p 80:80 -v "/Users/alexbeaman/Documents/Github/Just-To-Learn/docker/demos/80-multi-01-starting-setup/backend:/app" -v logs:/app/logs -v /app/node_modules --network goals-net -e MONGODB_USERNAME=addy goals-node`
        -   Not sure why adding `:ro` to bind mount didn't work :(
        -   Note: Adding `-e MONGODB_USERNAME=addy` as practice - could set in `Dockerfile`
    -   Note: needs `-p 80:80` for front-end if front-end is not also running in a container in the same network **AND** because front-end is running from browser, and browser code interacts with `localhost:80`
-   Start with `/frontend/Dockerfile` (and `.dockerignore`)
    -   `docker run -p 3000:3000 --rm --name goals-react -v "/Users/alexbeaman/Documents/Github/Just-To-Learn/docker/demos/80-multi-01-starting-setup/frontend/src:/app/src" -it goals-react`
        -   Note: the `-it` which is needed for React front-end
        -   Note: only copying `/src` folder because that's the useful source code we need. Additionally, this helps us not need anonymous volume `-v /app/node_modules` since `/app/src` is just as specific
        -   Note: we don't need `nodemon` because create-react-app automatically handles re-compiling after source code changing
            -   Note: possible limitation for windows users with wsl2 docker
        -   Note: not including `-d` so we can see the "Starting the dev server..." logs React spits out
        -   Note: in react, code is run **in the browser**, not "on the server". The React code isn't executed in the container, it runs in the browser. `npm start` just spins up the dev server, but the code is read & run by the browser on our host machine. So our `fetch` doesn't run in the container, but it runs in the browser, so it can't figure out `http://goals-node/...` api. Therefore, using container name in network is not allowed here :/
            -   Therefore, `--network goals-net` is not needed - it won't communicate with backend via the network, but instead via localhost (published ports)

Summary

-   Note: all of this setup in this module has been amazing for development, but not useful / desired for production.
-   Some optimizations to make in future:
    1. We have 3 big, ugly `docker run` commands that we need to run, individually, any time something changes
        - It would be great if we could run one command that would create all containers in one go
        - We'll learn about this in the next module
    1. This is a Dev-only setup
        - Not optimized for production, shouldn't be executed like this on a production server
