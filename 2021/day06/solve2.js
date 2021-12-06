const fs = require('fs');

const data = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split(',')
  .map(f => +f);


const fish = [0,0,0,0,0,0,0,0,0];

for(const f of data) {
  fish[f]++;
}

function iterate(input) {

  return [
    ...input.slice(1,7),
    input[0]+input[7],
    input[8],
    input[0]
  ];

}

function countPopulation(iterations, input) {

  // Create a copy
  input = [...input];
  for(let i=1; i < iterations+1; i++) {

    input = iterate(input); 

  }
  return Array.from(input.values()).reduce((acc, cur) => acc+cur, 0);
}

console.log('Part 1: %d', countPopulation(80, fish));
console.log('Part 2: %d', countPopulation(256, fish));
