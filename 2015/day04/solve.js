import { createHash } from 'crypto';
const input = 'iwrupvqb';

let i=0;


let hash;
let part1, part2;

while(true) {

  hash = createHash('md5').update(input+i, 'utf-8').digest('hex');

  if (hash.startsWith('00000')) {
    if (!part1) part1 = i;
    if (hash.startsWith('000000')) {
      part2 = i;
      break;
    }
  }
  i++;

} while (!hash.startsWith('000000'));


console.log('Part 1: %d', part1);
console.log('Part 2: %d', part2);
