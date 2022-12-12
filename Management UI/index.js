const path = require('path')

const express = require('express');
const app = express();

var Docker = require('dockerode');
var docker = new Docker();

app.set('view engine', 'ejs');

app.get('/', async function (req, res) {
    var containers = [];
    for (var containerBase of await docker.listContainers({all: true})) {
        var container = {};

        //Name
        var finalName = "";
        for (var name of containerBase.Names) {
            if (name.startsWith('/')) {
                name = name.substring(1);
            }
            finalName += name + " ";
        }
        finalName = finalName.substring(0, finalName.length - 1);

        //Ports
        var ports = [];
        for (var port of containerBase.Ports) {
            console.log(port);
            ports.push(`${port.PrivatePort}:${port.PublicPort} (${port.Type})`);
        }

        //Object container
        container.id = containerBase.Id;
        container.name = finalName;
        container.status = containerBase.Status;
        container.state = containerBase.State;
        container.ports = ports;

        //Push to containers
        containers.push(container);
    }
    console.log(containers);

    res.render('pages/index', { 
        containers: containers
    });
});

app.get('/start/:id', async (req, res) => {
    try {
        await docker.getContainer(req.params.id).start();
        res.sendStatus(200);
    } catch (e) {
        console.log(e.reason);
        res.status(500).send(e.reason);
    }
});

app.get('/stop/:id', async (req, res) => {
    try {
        await docker.getContainer(req.params.id).stop();
        res.sendStatus(200);
    } catch (e) {
        console.log(e.reason);
        res.status(500).send(e.reason);
    }
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000);