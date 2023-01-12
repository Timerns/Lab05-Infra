# Lab05-Infra

## Description
---
The mission is to use different tools to build a complete web infrastructure. 
- We build an environment that allow us to server static and dynamic content to web browsers and configure a web server and a reverse proxy.
- We build a simple and complete dynamic web applications of dice rolling by using  HTML, CSS and JavaScript assets. Our javascript fetch dynamically generated numbers by using AJAX requests.
- All the components are packaged in custom Docker images and we use Docker compose to have an infrastructure with several components.

## Project Structure
---
```
.   
├── Dynamic HTTP Server     # Contains the Dynamic server
├── Infra                    
|   └── traefik
|       └── log             # Store the traefik log
├── Load Balancing          # Load balancing
├── Management UI           # The management UI
└── Static HTTP server      # Contains the Static server
    └── src                 # Store the sources of the static server
        └── assets          # Store the assets
            ├── css         # Store the css
            └── js          # Store the javascript
```

## How to start and configure the project for each step
- [How to start and stop dockerfiles](./Infra/README.md#Description)
---
### Step 1: Static HTTP server with apache httpd

- Use the **php:7.2-apache** image for docker and copy all the files from my **src** folder in the **/var/www/html/** of the container
---
### Step 2: Dynamic HTTP server with express.js

- Use the **node:19.2** image for docker and then install all packages in the package.json file

### Step 3: 
For the first step all the configuration for deploying a first version of the infrastructure with a single static and a single dynamic Web server is in the 

#### Docker compose to build the infrastructure
- to start the infrastrucre witout trafik use the [docker-compose-step3.yml](./Infra/docke-compose-step3.yml) file
#### Reverse proxy with Traefik
- [Reverse proxy](./Infra/README.md#Deploy-a-static-web-server-and-a-dynamic-one)
---

### Step 4: AJAX requests with JQuery

- Use the **http://api.localhost/dice** address defined in the precedent step to dynamically fetch the data.
---
### Step 5: Load balancing: round-robin and sticky sessions

 
- [Laod balancing](./Infra/README.md#Load-balancing-with-Round-Robine-and-sticky)
---

### Step 6: Management UI

The management UI containers are in script where all ask container are configured. We have two management interface, one is Pornaire (a extended interface for docker) and the seconde one is owers where the service offers to see all contrainers and make somme action on them (start /stop / remove) the second tab offert to see all images on the system and we offert to create a container witout any argument.


- [End script in witch is the managemnt UI](./Infra/README.md#The-end-script)
--- 