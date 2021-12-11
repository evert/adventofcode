import { readInput, countSubstr } from '../../helpers.js';

const input = readInput();

const part1 =
  countSubstr(input,'(') +
  countSubstr(input, ')')*-1;

console.log('Part 1: %d', part1);

let floor = 0;
let part2 = 0;

for(; floor>=0; part2++) {

  if (input[part2]==='(') {
    floor++;
  } else {
    floor--;
  }

}

console.log('Part 2: %d', part2);
