import { readInput } from '../../helpers.js';

const input = readInput();

const groups = input.split('\n\n')
  .map( row => row.split('\n').map( item => +item));

/**
 * Takes an array of numbers and adds them up
 */
function total(group) {
  return group.reduce( (cur, acc) => cur + acc, 0);
}

/**
 * Add up all the calories per group,
 * stick it in a new array and sort by highest first
 */
const sortedGroups = groups
  .map( group => total(group))
  .sort((a, b) => b-a);

console.log('Part 1: %d', sortedGroups[0]);
console.log('Part 2: %d', sortedGroups[0]+sortedGroups[1]+sortedGroups[2]);
