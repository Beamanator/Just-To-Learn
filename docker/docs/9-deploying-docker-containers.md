# Deploying Docker Containers

124 - From dev to production

things to watch out for

1. Bind mounts shouldn't be used in production
1. Containerized apps might need a new `build` step (ex: react apps)
1. Multi-container projects might need to be split (or should be split) across multiple hosts / remote machines
1. Trade-offs between _control_ and _responsibility_ might be worth it!

125 - Deployment process & providers

## Basic example (Just NodeJS, no database, nothing else):

First, need hosting provider (google "docker hosting provider") - there are maaaaaany

-   Biggest: **AWS**, Microsoft Azure, Google Cloud
    -   Amazon (AWS) EC2 (free for 12 months)

Steps:

1. Create and launch EC2 instance, VPS and security group
1. Configure security group to expose all required ports to WWW
1. Connect to instance (SSH), install Docker and pull & run our container

`docker build -t node-dep-example .`
`docker run -d --rm --name node-dep -p 80:80 node-dep-example`

Note: not using bind mounts now.

-   In development...
    -   Containers should encapsulate the runtime environment but not necessarily the code
    -   Use "Bind Mounts" to provide your local host project files to the running container
    -   Allows for instant updates without restarting the container
-   In production...
    -   A container should really work standalone ("single source of truth"), you should NOT have source code on your remote machine
    -   Use `COPY` (instead of Bind Mounts) to copy a code snapshot into the image

AWS Management Console -> Search for EC2 (virtual servers in the cloud)

-   Find some "Launch instance" button, not from a template

1. Choose amazon machine image:
    - Choose "Amazon Linux AMI" machine
1. Choose an instance type:
    - Choose Free tier elegible machine
1. Configure Instance Details
    - Make sure Network (VPC) is created, leave everything else as default
1. (7) Review Instance Launch -> Launch
    - Select an existing key pair or create a new key pair
        - Needed for connecting via SSH
        - Create new key pair, any name, then Download (only can download once!)

Done, now look at Instances, until it's "running" (instance state)

Connecting via SSH

1. Open SSH client
1. Locate private key (downloaded previously)
1. `chmod 400 key-pair-name.pem`
1. copy `ssh -i ...` command to connect

Now you'll see `ec2-user@...` which is sending commands to remote machine

Other links:

-   More AWS basics: https://academind.com/tutorials/aws-the-basics/
-   Connecting via PuTTY: https://docs.aws.amazon.com/quickstarts/latest/vmlaunch/step-2-connect-to-instance.html#putty

130 - installing docker on virtual machine

Note: these commands are on the remote machine

`sudo yum update -y`

`sudo amazon-linux-extras install docker`

-   On amazon-based instances, it's quite easy to install extra software like docker

`sudo service docker start`

now we can run docker commands like `docker run`

setup w/ other providers may be found here: https://docs.docker.com/engine/install/

132 - push local image to cloud

options

1. deploy source, then build image on remote machine
1. build image ahead of time and deploy that to remote machine
    - this is much preferred option - can be done with Dockerhub
    1. Build locally
    1. `docker tag <previous-tag> <user>/repo`
    1. `docker login` then `docker push <user>/repo` to dockerhub
    1. `sudo docker run -d --rm -p 80:80 <user>/repo` on amazon server
    1. Test project by looking for IPv4 Public IP, then enter into browser
        - By default, your EC2 instance is not connected to WWW
        - Scroll to Security Groups, find the group which is attached to your EC2
        - Outbound rules decides which traffic is allowed outbound (everything is allowed by default)
            - ex: connection to docker hub - ran with no problems
        - inbound is locked to port 22, type SSH by default
            - edit -> add rule HTTP -> source anywhere

134 - managing & updating the container / image

Say you update your local code

1. re-build image locally
1. tag locally & re-push to docker hub
1. in ec2 instance, stop running container, run `sudo docker pull <image-name>` to update locally, then `docker run`

When you're finished / want to shut down ec2, `terminate` the remote server via AWS dashboard

135 - disadvantages of current approach

1. Lots of steps on our own
1. Main thing to keep in mind is you fully "own" the remote machine -> and you're responsible for configuration and its **SECURITY**!
    - Even operating system updates, network and security groups and firewall, etc
1. SSHing into machine to manage it can be pretty annoying

136 - possible solution: Managed services

Ex: AWS ECS (Amazon - Elastic Container Service), Microsoft Azure Containers, (Google as well)

-   helps with launching monitoring services, etc
-   less controll, but also less responsibility & less chances to screw things up :D
-   now you aren't running `docker` command, but you have to use the tools provided by cloud provider, for the specific service you want to use

138-141 - Deploying with AWS ECS

Note: ECS doesn't have a free tier :/

Docker-compose is great for development on one machine, but not super fantastic for production since it's possible (probable) that you'll run multiple containers on multiple machines

... more that I didn't take notes on
