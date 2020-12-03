const fs = require('fs');
const lines = fs.readFileSync('./input', 'utf-8').split('\n');

const lineLength = lines[0].length;

function check(xStep, yStep) {

  let trees = 0;
  let posY = yStep;
  let posX = xStep;

  do {

    if (lines[posY][posX] === '#') trees++;
    posY += yStep;
    posX = (posX + xStep) % lineLength;

  } while(posY < lines.length);

  console.log('Right %i, down %i: %i', xStep, yStep, trees);
  return trees;

}


const checks = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
];

const total = checks.reduce( (p, c) => check(...c) * p, 1);
console.log('total', total);
