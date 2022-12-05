const PORT = 80; 

var express = require('express');
var app = express();

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        dices: {
            1: 7,
            2: 6,
            3: 3,
        }
    }));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} !`);
});