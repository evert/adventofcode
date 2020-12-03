const fs = require('fs');
const lines = fs.readFileSync('./input', 'utf-8').split('\n');

const lineLength = lines[0].length;

function check(xStep, yStep) {

  let trees = 0;
  let posX = xStep;

  // In a weird mood with this loop
  for(
    let posY = yStep, posX = xStep;
    posY < lines.length;
    posY += yStep, posX = (posX + xStep) % lineLength
  ) {

    if (lines[posY][posX] === '#') trees++;

  }

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
