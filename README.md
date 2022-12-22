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
├── Dynamic HTTP Server          # SMTP Server with all docker files
├── Infa                 # Store the figures for the README.md
    ├── traefik
        ├── log
├── Load Balancing               # Configuration files for the project
│   ├── config.properties   # Configuration of the SMTP server and the
│   │                         the number of pranked groups 
│   ├── email.utf8          # List of all emails
│   └── messaages.utf8      # List of possible messages
├── Static HTTP server                     # Source files of prank project
├── package-lock.json                 # Maven configuration file
└── README.md
```

## How to start and configure the project for each step
---

### Step 1: Static HTTP server with apache httpd
---
- 

### Step 2: Dynamic HTTP server with express.js
---
- 

### Step 3: 
---
#### Docker compose to build the infrastructure
- 
#### Reverse proxy with Traefik
- 
#### Dynamic cluster management
- 

### Step 4: AJAX requests with JQuery
---
- 

### Step 5: Load balancing: round-robin and sticky sessions
---
- 

### Step 6: Management UI
---
- 