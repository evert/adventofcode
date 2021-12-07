const fs = require('fs');

const crabs = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split(',')
  .map(f => +f);


const max = Math.max(...crabs);

let bestFuel1 = Infinity;
let bestFuel2 = Infinity;

for(let position=0; position <= max; position++) {

  const fuel1 = crabs.reduce((fuel, crab) => fuel+Math.abs(position-crab),0);
  const fuel2 = crabs.reduce((fuel, crab) => fuel+fuel2Calc(Math.abs(position-crab)),0);

  console.log('%d -> %d %d', position, fuel1, fuel2);

  bestFuel1 = Math.min(fuel1, bestFuel1);
  bestFuel2 = Math.min(fuel2, bestFuel2);

}

console.log('Part 1: %d', bestFuel1);
console.log('Part 2: %d', bestFuel2);

function fuel2Calc(steps) {

  return (steps/2) * (steps+1);

}
