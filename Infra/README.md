# Docker Compose

## Description

This file comment all the different docker-compose files for each step. 

For all the docker compose files you can run them by running this command:
> docker compose up -d

To start a docker compose file that has another name, you can start the specific file using a relative path:

> docker compose -f .\docker-compose-step5.yml up -d

that will run your docker compose file and run all configuration in detached mode (Run containers in the background)

For shutting down the infrastructure you can run the following command:
> docker compose down

## Deploy a static web server and a dynamic one
Followig are all the configurations needed to deploy a first version of the infrastructure with a single static and a single dynamic Web server.

When this docker compose file is run you can access the following urls:
  - [The api service](http://api.localhost/dice)
  - [The static web server](http://static.localhost)
### File 
The file is located at [./docker-compose-step3.yml](./docker-compose-step3.yml)
```yml
version: '3.8'

services:
  #--------------------------------------------------------------
  #---------------------------   Traefik   ----------------------
  #--------------------------------------------------------------
  traefik:
    image: traefik:v2.9 
    command:
      - "--api.insecure=false"                      # disable the traefik api
      - "--api.dashboard=false"                     # disable the traefik dashboard
      - "--providers.docker=true"                   # setup traefik for docker
      - "--providers.docker.exposedByDefault=false" # force all the service that need
                                                    # to use traef to add the line
                                                    # - "traefik.enable=true"
      # setup the name of the entrypoint to be web for all
      # trafik entering on port 80
      - "--entrypoints.web.address=:80"             # setup the name of the entrypoints for the port 80 as web
      # Logs
      - "--log.level=ERROR"                         # log all the error
      - "--log.filePath=/logs/traefik.log"          # log to the /log/traefik.log
      - "--log.format=json"                         # store the logs in json
    ports:
      - "80:80"                                     # port forwarding (Host port):(Container port) 
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock   # the volume where all the docker events are sent
      - ./traefik/log:/logs                         # stores permanantly the log in the log folder on the host machine 
 
  #--------------------------------------------------------------
  #---------------------------   Dice API   ---------------------
  #--------------------------------------------------------------
  dice_api:
    build: 
      context: "../Dynamic HTTP Server/"
      dockerfile: Dockerfile
    deploy:
      replicas: 1
    depends_on:
      - traefik
    labels:
      - "traefik.enable=true"                                       # notify traefik that it can use the service
      - "traefik.http.routers.dice_api.rule=Host(`api.localhost`) && Path(`/dice`)" # configure on witch URL you can access the service
      - "traefik.http.routers.dice_api.entrypoints=web"             # configure that u need to acces the web entrypoint
      # middleware
      - "traefik.http.routers.dice_api.middlewares=suffixremover"             # add the suffixremover middleware to the route           
      - "traefik.http.middlewares.suffixremover.stripprefix.forceslash=false" # configure the suffixremover to not force the 
                                                                              # append of a / if it is not ending by a /
      - "traefik.http.middlewares.suffixremover.stripprefix.prefixes=/dice"   # configure the suffixremover to remove the /dice of the URL
      
  #--------------------------------------------------------------
  #---------------------------   Static   -----------------------
  #--------------------------------------------------------------
  static:
    build: 
      context: "../Static HTTP server/"
      dockerfile: Dockerfile
    deploy:
      replicas: 1
    depends_on:
      - traefik
    labels:
      - "traefik.enable=true"                                       # notify traefik that it can use the service
      - "traefik.http.routers.static.rule=Host(`static.localhost`)" # configure on witch URL you can access the service
      - "traefik.http.routers.static.entrypoints=web"               # configure that u need to acces the web entrypoint

```
---
## Load balancing with Round Robin and sticky session
To test the load balancing service provided by traefik, we create a service that shows the local IP from the container.
The docker compose file contains 3 services : the first is traefik and the two others are our own made load balancing test service but with some changes in the configuration.

When this docker compose file is run you can access the following urls:
  - [default configuration] [The round robin service](http://rr.localhost)
  - [The sticky load balancer](http://sticky.localhost)
### File 
The file is located at [./docker-compose.yml](./docker-compose.yml)
```yml
version: '3.8'

services:
  #--------------------------------------------------------------
  #---------------------------   Traefik   ----------------------
  #--------------------------------------------------------------
  traefik:
    image: traefik:v2.9 
    command:
      - "--api.insecure=false"                      # disable the traefik api
      - "--api.dashboard=false"                     # disable the traefik dashboard
      - "--providers.docker=true"                   # setup traefik for docker
      - "--providers.docker.exposedByDefault=false" # force all the service that need
                                                    # to use traef to add the line
                                                    # - "traefik.enable=true"
      # setup the name of the entrypoint to be web for all
      # trafik entering on port 80
      - "--entrypoints.web.address=:80"             # setup the name of the entrypoints for the port 80 as web
      # Logs
      - "--log.level=ERROR"                         # log all the error
      - "--log.filePath=/logs/traefik.log"          # log to the /log/traefik.log
      - "--log.format=json"                         # store the logs in json
    ports:
      - "80:80"                                     # port forwarding (Host port):(Container port) 
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock   # the volume where all the docker events are sent
      - ./traefik/log:/logs                         # stores permanantly the log in the log folder on the host machine 

  #--------------------------------------------------------------
  #---------------   Load Balancer Round Robine   ---------------
  #--------------------------------------------------------------
  load_balancer_rr:
    build: 
      context: "../Load Balancing/"
      dockerfile: Dockerfile
    deploy:
      replicas: 3
    depends_on:
      - traefik   # start the container after that the traefik container is up
    labels:
      - "traefik.enable=true"                                             # notify traefik that it can use the service
      - "traefik.http.routers.load_balancer_rr.rule=Host(`rr.localhost`)" # configure on witch URL you can access the service
      - "traefik.http.routers.load_balancer_rr.entrypoints=web"           # configure that u need to acces the web entrypoint
      
  #--------------------------------------------------------------
  #-------------------   Load Balancer Sticky   -----------------
  #--------------------------------------------------------------
  load_balancer_sticky:
    build: 
      context: "../Load Balancing/"
      dockerfile: Dockerfile
    deploy:
      replicas: 3
    depends_on:
      - traefik   # start the container after that the traefik container is up
    labels:
      - "traefik.enable=true"                                                                             # notify traefik that it can use the service
      - "traefik.http.routers.load_balancer_sticky.rule=Host(`sticky.localhost`)"                         # configure on witch URL you can access the service
      - "traefik.http.routers.load_balancer_sticky.entrypoints=web"                                       # configure that u need to acces the web entrypoint
      - "traefik.http.services.load_balancer_sticky.loadBalancer.sticky.cookie=true"                      # configure the load balancer to be sticky with cookie
      - "traefik.http.services.load_balancer_sticky.loadBalancer.sticky.cookie.name=sticky_load_balancer" # configure the name of the cookie to be sticky_load_balancer
```

## The end script
This script starts the whole infrastructure. The default network is the exact configuration that we need (bridge). All the containers need to be in the same network as the traefik container, a second network is not necessary. The containers where we need to be careful are all the one's where we mount the /var/run/docker.sock volume. If one of this containers is vulnerable the host system can be too.

We change the static website by giving the docker image a volume that is directly mapped on the correct folder. It enables to make live changes on the website.
### links
  - [The api service](http://api.localhost/dice)
  - [The static web server](http://static.localhost)
  - [The sticky load balancer](http://sticky.localhost)
  - [The round robin service](http://rr.localhost)
  - [Portainer](http://portainer.localhost)
  - [Our own docker mangement app](http://management.localhost)

### File

```yml
version: '3.8'

services:
  #--------------------------------------------------------------
  #---------------------------   Traefik   ----------------------
  #--------------------------------------------------------------
  traefik:
    image: traefik:v2.9 
    command:
      - "--api.insecure=false"                      # disable the traefik api
      - "--api.dashboard=false"                     # disable the traefik dashboard
      - "--providers.docker=true"                   # setup traefik for docker
      - "--providers.docker.exposedByDefault=false" # force all the service that need
                                                    # to use traef to add the line
                                                    # - "traefik.enable=true"
      # setup the name of the entrypoint to be web for all
      # trafik entering on port 80
      - "--entrypoints.web.address=:80"             # setup the name of the entrypoints for the port 80 as web
      # Logs
      - "--log.level=ERROR"                         # log all the error
      - "--log.filePath=/logs/traefik.log"          # log to the /log/traefik.log
      - "--log.format=json"                         # store the logs in json
    ports:
      - "80:80"                                     # port forwarding (Host port):(Container port) 
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock   # the volume where all the docker events are sent
      - ./traefik/log:/logs                         # stores permanantly the log in the log folder on the host machine 
 
  #--------------------------------------------------------------
  #---------------------------   Dice API   ---------------------
  #--------------------------------------------------------------
  dice_api:
    build: 
      context: "../Dynamic HTTP Server/"
      dockerfile: Dockerfile
    deploy:
      replicas: 1
    depends_on:
      - traefik    # start the container after that the traefik container is up
    labels:
      - "traefik.enable=true"                                                       # notify traefik that it can use the service
      - "traefik.http.routers.dice_api.rule=Host(`api.localhost`) && Path(`/dice`)" # configure on witch URL you can access the service
      - "traefik.http.routers.dice_api.entrypoints=web"                             # configure that u need to acces the web entrypoint
      # middleware
      - "traefik.http.routers.dice_api.middlewares=suffixremover"             # add the suffixremover middleware to the route           
      - "traefik.http.middlewares.suffixremover.stripprefix.forceslash=false" # configure the suffixremover to not force the 
                                                                              # append of a / if it is not ending by a /
      - "traefik.http.middlewares.suffixremover.stripprefix.prefixes=/dice"   # configure the suffixremover to remove the /dice of the URL
      
  #--------------------------------------------------------------
  #---------------------------   Static   -----------------------
  #--------------------------------------------------------------
  static:
    image: php:7.2-apache
    restart: unless-stopped
    deploy:
      replicas: 1
    depends_on:
      - traefik   # start the container after that the traefik container is up
    labels:
      - "traefik.enable=true"                                       # notify traefik that it can use the service
      - "traefik.http.routers.static.rule=Host(`static.localhost`)" # configure on witch URL you can access the service
      - "traefik.http.routers.static.entrypoints=web"               # configure that u need to acces the web entrypoint
    volumes:
      - "../Static HTTP server/src:/var/www/html/"                  # the volume where all static file are store   

  #--------------------------------------------------------------
  #---------------   Load Balancer Round Robine   ---------------
  #--------------------------------------------------------------
  load_balancer_rr:
    build: 
      context: "../Load Balancing/"
      dockerfile: Dockerfile
    deploy:
      replicas: 3
    depends_on:
      - traefik   # start the container after that the traefik container is up
    labels:
      - "traefik.enable=true"                                             # notify traefik that it can use the service
      - "traefik.http.routers.load_balancer_rr.rule=Host(`rr.localhost`)" # configure on witch URL you can access the service
      - "traefik.http.routers.load_balancer_rr.entrypoints=web"           # configure that u need to acces the web entrypoint
      
  #--------------------------------------------------------------
  #-------------------   Load Balancer Sticky   -----------------
  #--------------------------------------------------------------
  load_balancer_sticky:
    build: 
      context: "../Load Balancing/"
      dockerfile: Dockerfile
    deploy:
      replicas: 3
    depends_on:
      - traefik   # start the container after that the traefik container is up
    labels:
      - "traefik.enable=true"                                                                             # notify traefik that it can use the service
      - "traefik.http.routers.load_balancer_sticky.rule=Host(`sticky.localhost`)"                         # configure on witch URL you can access the service
      - "traefik.http.routers.load_balancer_sticky.entrypoints=web"                                       # configure that u need to acces the web entrypoint
      - "traefik.http.services.load_balancer_sticky.loadBalancer.sticky.cookie=true"                      # configure the load balancer to be sticky with cookie
      - "traefik.http.services.load_balancer_sticky.loadBalancer.sticky.cookie.name=sticky_load_balancer" # configure the name of the cookie to be sticky_load_balancer

  #--------------------------------------------------------------
  #--------------------------   Portainer   ---------------------
  #--------------------------------------------------------------
  portainer:
    image: portainer/portainer-ce:latest
    container_name: portainer
    restart: unless-stopped
    security_opt:
      - no-new-privileges:true
    depends_on:
      - traefik   # start the container after that the traefik container is up
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock:ro
      - ./portainer:/data
    labels:
      - "traefik.enable=true"                                              # notify traefik that it can use the service
      - "traefik.http.routers.portainer.rule=Host(`portainer.localhost`)"  # configure on witch URL you can access the service
      - "traefik.http.routers.portainer.entrypoints=web"                   # configure that u need to acces the web entrypoint
      - "traefik.http.services.portainer.loadbalancer.server.port=9000"    # change the port on whitch the request need to be send

  #--------------------------------------------------------------
  #-------------------------   Management   ---------------------
  #--------------------------------------------------------------
  management:
    build: 
      context: "../Management UI/"
      dockerfile: Dockerfile
    restart: unless-stopped
    container_name: management
    depends_on:
      - traefik   # start the container after that the traefik container is up
    labels:
      - "traefik.enable=true"                                                      # notify traefik that it can use the service
      - "traefik.http.routers.management.rule=Host(`management.localhost`)"        # configure on witch URL you can access the service
      - "traefik.http.routers.management.entrypoints=web"                          # configure that u need to acces the web entrypoint
      - "traefik.http.services.management.loadbalancer.server.port=3000"           # change the port on whitch the request need to be send
    volumes:
      - /var/run/docker.sock:/var/run/docker.sock                                  # the volume where all the docker events are sent
```