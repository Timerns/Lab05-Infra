const express = require('express');
const app = express();

var Docker = require('dockerode');
var docker = new Docker();

app.get('/', async function (req, res) {
  res.send(await docker.info());
});

app.listen(80);