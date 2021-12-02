const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split('\n')
  .map(row => parseInt(row,10));

let counter = 0;
let prev = Infinity;

for(const row of input) {
  if (row > prev) counter++;
  prev = row;
}

console.log('Part 1: %d', counter);


counter = 0;
prev = Infinity;

for(let ii=0; ii < input.length-2; ii++) {

  const sum = input.slice(ii, ii+3).reduce((a, b) => a + b, 0);
  if (sum > prev) counter++;
  prev = sum;

}

console.log('Part 2: %d', counter);

