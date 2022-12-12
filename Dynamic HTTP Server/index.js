const PORT = 80; 

var express = require('express');
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
});

app.get('/', (req, res) => {
    res.send(JSON.stringify({
        dice: [
            getRandomDiceValue(),
            getRandomDiceValue(),
            getRandomDiceValue()
        ]
    }));
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT} !`);
});

/**
 * Returns a random dice value [1, 9]
 * @returns {number} The dice value
 */
function getRandomDiceValue() {
    return getRandomInt(6) + 1;
}

/**
 * Returns a random value in the range [0, max[
 * @param {number} max The max number
 * @returns A number in the range [0, max[
 */
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}