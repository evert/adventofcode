import { readInput } from '../../helpers.js';

const data = readInput()
  .split('\n')
  .map(line => line.split('x'));


const part1 = data.reduce((acc, cur) => {

  const sorted=cur.sort((a,b)=>a-b);

  return acc +=
    sorted[0]*sorted[1]*3 +
    sorted[1]*sorted[2]*2 +
    sorted[0]*sorted[2]*2;

},0);

console.log('Part 1: %d', part1);

const part2 = data.reduce((acc, cur) => {

  const sorted=cur.sort((a,b)=>a-b);
  return acc +
    sorted[0]*2 + sorted[1]*2 +
    sorted[0]*sorted[1]*sorted[2];

}, 0);

console.log('Part 2: %d', part2);
