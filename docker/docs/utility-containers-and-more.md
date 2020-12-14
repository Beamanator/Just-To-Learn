# Working with "Utility Containers" & Executing Commands In Containers

What's a "Utility Container"? Made-up by instructor

Main purpose of containers = isolate environment & code in **Application Containers**

-   Runs CMD and starts app

Utility Containers = only have a certain environment (Node, PHP, etc). THey don't start an app, but you run them in conjunction with some command to execute some task

-   Executes / appends custom command

102 - Example usage:

-   Wanting to start a new node package (npm), but to start a new one, you should do `npm init` which requires Node to be installed as well.
-   Similar for PHP Laravel coding, maybe even Flutter environments
-   Get some log files inside a container without interrupting the main process

103 - running commands in a running container

Once a container is running, you can execute a command **in** that container with `docker exec <container-name> <command(s)...>`

-   Ex: `docker exec <container-name> npm init`
    -   Note: With `npm init`, you'll want to also add `-it` so you can interact with the terminal for the duration of that command

Overwrite default `CMD` (command) with:

-   `docker run -it node npm init`

104 - building a utility container

Use the utility container to add some files (ex: package.json) on your host machine

-   `docker run -it -v "/Users/alexbeaman/Documents/Github/Just-To-Learn/docker/demos/104-first-utility-container:/app" <node-image-name> npm init`
    -   This will create a new package.json file on your local machine, where you specify the bind mount path

105 - using `ENTRYPOINT`

Maybe want to have a utility container that **only** allows us to use `npm` commands

-   Also to protect us from accidentally doing destructive node commands

`ENTRYPOINT` - similar to `CMD`, but here's the difference:

-   `CMD`: commands at the end of `docker run` **overwrite** what you have in `CMD` instruction (if there is one)
-   `ENTRYPOINT`: commands at the end of `docker run` are **appended** to what you have in this value

Disadvantage: We have to run some relatively long commands in the terminal

-   solution: docker compose?! :D

106

Set up your service (probably only 1) as normal, then...

-   `docker-compose run --rm <service-name> <command(s)...>`
    -   Note: `run` here keeps the container open, even after it shuts down, which is why it's recommended to add `--rm`

Note: if you're using Linux, you may find help here: https://www.udemy.com/course/docker-kubernetes-the-practical-guide/learn/#questions/12977214/
