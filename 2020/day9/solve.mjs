import { readFileSync } from 'fs';

const numbers = readFileSync('./input', 'utf-8').trimEnd().split("\n").map(n => parseInt(n,10));

const preamble = 25;

let part1;

for(let i=preamble; i < numbers.length; i++) {

  if (!hasSumOf(numbers[i], numbers.slice(i-25, i))) {
    part1 = numbers[i];
    break;
  }

}

console.log('Part 1', part1);


const collected = [];

for(let i=0; i < numbers.length; i++) {
  if (numbers[i] === part1) {
    // Skip the 'answer' because it doesn't count
    continue;
  }
  collected.push(numbers[i]);
  let sum = arraySum(collected);

  while(sum > part1) {
    sum -= collected.shift();
  }
  if (sum === part1) {
    console.log('Part 2', Math.min(...collected) + Math.max(...collected));
    break;
  }

}

function hasSumOf(sum, input) {

  for(let ii=0; ii < input.length; ii++) {
    for(let jj=0; jj < input.length; jj++) {
      if (jj===ii) continue;
      if (input[jj]+input[ii] === sum) {
        return true;
      }
    }
  }
  return false;

}

/**
 * @param {number[]} input
 */
function arraySum(input) {

  return input.reduce((acc, val) => acc+val, 0);

}
