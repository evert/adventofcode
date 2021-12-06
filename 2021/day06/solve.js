const fs = require('fs');

const fish = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split(',')
  .map(f => +f);


/**
 * A handy extension to the Map object.
 */
class AddMap extends Map {

  add(key, count) {

    if (this.has(key)) {
      this.set(key, this.get(key)+count);
    } else {
      this.set(key, count);
    }

  }

}

const buckets = new AddMap();

for(const f of fish) {
  buckets.add(f, 1);
}

function iterate(input) {

  const output = new AddMap();
  for(const [timer, count] of input.entries()) {

    if (timer > 0) {
      output.add(timer-1, count); 
    } else {
      output.add(6, count); 
      output.add(8, count); 
    }

  }
  return output;

}

function countPopulation(iterations, input) {

  // Create a copy
  input = new Map(input);
  for(let i=1; i < iterations+1; i++) {

    input = iterate(input); 

  }
  return Array.from(input.values()).reduce((acc, cur) => acc+cur, 0);
}

console.log('Part 1: %d', countPopulation(80, buckets)); 
console.log('Part 2: %d', countPopulation(256, buckets)); 
