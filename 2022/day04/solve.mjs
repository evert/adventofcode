import { readInput, commonChars } from '../../helpers.js';

const input = readInput();

const pairs = input.split('\n').map(
  item => 
    item.match(/^([0-9]+)-([0-9]+),([0-9]+)-([0-9]+)$/)
      .slice(1)
      .map( num => +num )
);

const part1 = pairs.filter(
  ([a1, a2, b1, b2]) => (a1 >= b1 && a2 <= b2) || (b1 >= a1 && b2 <= a2)
).length;

console.log('Part 1: %i', part1);

const part2 = pairs.filter(
  ([a1, a2, b1, b2]) => (a1 <= b2 && a2 >= b1)
).length;

console.log('Part 2: %i', part2);
