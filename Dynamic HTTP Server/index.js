const PORT = 80; 

var express = require('express');
var app = express();

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