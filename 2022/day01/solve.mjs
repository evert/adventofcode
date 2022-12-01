import { readInput } from '../../helpers.js';

const input = readInput();

const groups = input.split('\n\n')
  .map( row => row.split('\n').map( item => +item));

let part1 = 0;

function total(group) {
  return group.reduce( (cur, acc) => cur + acc, 0);
}


for(const group of groups) {

  if (total(group)>part1) part1 = total(group);

}

console.log('Part 1: %d', part1);

const sortedGroups = groups.sort((a, b) => total(b)-total(a));

console.log('Part 2: %d', total(sortedGroups[0])+total(sortedGroups[1])+total(sortedGroups[2]));
