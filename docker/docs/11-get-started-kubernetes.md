# Getting started with Kubernetes

170 - Some problems with manual deployment (example relating to EC2)

-   Manual deployment is hard to maintain, error-prone, and annoying
-   Security & configuration concerns
-   Containers might crash / go down and need to be replaced
-   Might need more container instances upon traffic spikes / increased need
-   Incoming traffic should be distributed equally across containers

171 - Why Kubernetes?

Note: AWS ECS helps solve last 3 options above

-   Container health checks + automatic re-deployment, Autoscaling, Load Balancer
-   Disadvantage: we're basically locked into that service
    -   Ex: with ECS, we have to configure using their settings, only useful for AWS ECS though! Also have to know specific services, config settings, etc. for that service
    -   -> Just knowing Docker isn't enough!

172 - What is Kubernetes?

Kubernetes is an open-source system (and de-facto standard) for orchestrating container deployments

-   Automatic deployment, Scaling & load-balancing, management
-   Kubernetes Configuration
    -   Can be passed to any cloud provider or remote machines
    -   Can even add provider-specific settings to config file!

What Kubernetes is NOT

-   cloud service provider (it's an open-source project & collection of concepts / software)
-   service by a cloud service provider (it can be used with any provider / machine you own)
-   not restricted to any specific cloud service provider
-   it's not just a software you run on your machine
-   not an alternative to Docker, it works WITH docker
-   not a paid service (it's open-source)

Kubernetes is like Docker-Compose for multiple machines!

-   Like docker-compose for deployment (ish?)
