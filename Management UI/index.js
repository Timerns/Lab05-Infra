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

    res.render('pages/index', { 
        containers: containers
    });
});

app.get('/images', async function (req, res) {
    var images = [];
    for (var imageBase of await docker.listImages({all: true})) {
        var image = {};

        //Tags
        var tags = [];
        for (var tag of imageBase.RepoTags) {
            tags.push(tag);
        }

        //Object container
        image.id = imageBase.Id;
        image.size = parseFloat(imageBase.Size / 1024 / 1024).toFixed(2) + "MB";
        image.createdAt = new Date(imageBase.Created * 1000).toISOString().substring(0, 10);
        image.tags = tags;

        //Push to containers
        images.push(image);
    }

    res.render('pages/images', { 
        images: images
    });
});

app.get('/start/:id', async (req, res) => {
    try {
        await docker.getContainer(req.params.id).start();
        onSuccess(res);
    } catch (e) {
        onError(res, e);
    }
});

app.get('/stop/:id', async (req, res) => {
    try {
        await docker.getContainer(req.params.id).stop();
        onSuccess(res);
    } catch (e) {
        onError(res, e);
    }
});

app.get('/add/:id', async (req, res) => {
    try {
        await docker.createContainer({ Image: req.params.id });
        onSuccess(res);
    } catch (e) {
        onError(res, e);
    }
});

app.get('/remove/:id', async (req, res) => {
    try {
        await docker.getContainer(req.params.id).remove();
        onSuccess(res);
    } catch (e) {
        onError(res, e);
    }
});

function onSuccess(res) {
    res.status(200).send(undefined);
}

function onError(res, e) {
    res.status(500).send(e.message);
}

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
  console.log(`Listening on port ${3000} !`);
});