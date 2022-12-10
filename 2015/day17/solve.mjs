import { readInput } from '../../helpers.js';

const input = readInput()
  .split('\n')
  .map(l => +l);



let part1 = 0;
const found = [];

function getCombos(containers, nogLeft = 150, containersUsed = 0) {

  if (containers.length === 0) {
    if (nogLeft===0) {
      found.push(containersUsed);
      part1++;
    }
    return;
  }

  const [current, ...otherContainers] = containers;

  getCombos(otherContainers, nogLeft-current, containersUsed+1);
  getCombos(otherContainers, nogLeft, containersUsed);


}

getCombos(input);

console.log('Part 1: %i', part1);

const lowest = Math.min(...found);

console.log('Part 2: %i', found.filter( f => f===lowest).length );

