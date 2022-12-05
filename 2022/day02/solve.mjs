import { readInput } from '../../helpers.js';

const input = readInput();

const games = input.split('\n')
  .map( row => row.split(' '));

const scores = {
  'rock': 1,
  'paper': 2,
  'scissors': 3,
};

const moveConvert = {
  A: 'rock',
  B: 'paper',
  C: 'scissors',
  X: 'rock',
  Y: 'paper',
  Z: 'scissors'
}

let score1 = 0;

function moveMap(input) {

  return [moveConvert[input[0]], moveConvert[input[1]]];

}

function getScore(player, opponent) {

  if (
    opponent === player
  ) {
    // tie
    return 3 + scores[player]; 
  } else if (
    (player === 'rock' && opponent === 'scissors') ||
    (player === 'paper' && opponent === 'rock') ||
    (player === 'scissors' && opponent === 'paper')
  ) {

    // win
    return 6 + scores[player]; 

  } else {

    // lose
    return 0 + scores[player]; 

  }

}

for (const game of games) {

  const [opponent, player] = moveMap(game);
  score1 += getScore(player, opponent);

}

console.log('Part 1: %i', score1);

let score2 = 0;
for (const game of games) {

  const [opponent] = moveMap(game);

  if (game[1] === 'X') {
    // Must lose
    switch(opponent) {
      case 'rock' :
        score2 += getScore('scissors', opponent);
        break;
      case 'paper' :
        score2 += getScore('rock', opponent);
        break;
      case 'scissors' :
        score2 += getScore('paper', opponent);
        break;
    }

  }
  if (game[1] === 'Y') {
    // Must draw
    score2 += getScore(opponent, opponent);
  }
  if (game[1] === 'Z') {
    // Must win 
    switch(opponent) {
      case 'rock' :
        score2 += getScore('paper', opponent);
        break;
      case 'paper' :
        score2 += getScore('scissors', opponent);
        break;
      case 'scissors' :
        score2 += getScore('rock', opponent);
        break;
    }
  }

}

console.log('Part 2: %i', score2);
