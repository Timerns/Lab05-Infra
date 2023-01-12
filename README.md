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
---
- To start Docker :
```

```
- To stop Docker :
```

```

### Step 1: Static HTTP server with apache httpd
---
- Use the **php:7.2-apache** image for docker and copy all the files from my **src** folder in the **/var/www/html/** of the container

### Step 2: Dynamic HTTP server with express.js
---
- 

### Step 3: 
For the first step all the configuration for deploying a first version of the infrastructure with a single static and a single dynamic Web server is in the 

#### Docker compose to build the infrastructure
- 
#### Reverse proxy with Traefik
- 
#### Dynamic cluster management
- 

### Step 4: AJAX requests with JQuery
---
- Use the **http://api.localhost/** address defined in the precedent step to dynamically fetch the data.

### Step 5: Load balancing: round-robin and sticky sessions
---
- 

### Step 6: Management UI
---
- 