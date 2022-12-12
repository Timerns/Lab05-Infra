var elDiceOne       = document.getElementById('dice1');
var elDiceTwo       = document.getElementById('dice2');
var elDiceThree     = document.getElementById('dice3');

setInterval(() => {
  rollDice(Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1), Math.floor((Math.random() * 6) + 1));
}, 3000);

function rollDice(diceOne, diceTwo, diceThree) { 
  console.log(diceOne + ' ' + diceTwo + ' ' + diceThree);

  for (var i = 1; i <= 6; i++) {
    elDiceOne.classList.remove('show-' + i);
    if (diceOne === i) {
      elDiceOne.classList.add('show-' + i);
    }
  }

  for (var j = 1; j <= 6; j++) {
    elDiceTwo.classList.remove('show-' + j);
    if (diceTwo === j) {
      elDiceTwo.classList.add('show-' + j);
    }
  }

  for (var k = 1; k <= 6; k++) {
    elDiceThree.classList.remove('show-' + k);
    if (diceThree === k) {
      elDiceThree.classList.add('show-' + k);
    }
  }
}
