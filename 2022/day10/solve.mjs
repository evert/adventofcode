import { readInput } from '../../helpers.js';

const input = readInput()
  .split('\n');

let cycle = 0;
let xRegister = 1;
let part1 = 0;

console.log('Part 2:');

for(const line of input) {

  incCylce();
  if (line.startsWith('addx')) {
    incCylce();
    xRegister += +line.substr(5)
  }

}

function incCylce() {

  const offset = cycle % 40;
  const spriteStart = xRegister-1;

  cycle++;
  if ([spriteStart, spriteStart+1, spriteStart+2].includes(offset)) {
    process.stdout.write('#');
  } else {
    process.stdout.write('.');
  }
  if (cycle % 40 === 0) {
    process.stdout.write('\n');
  }

  if ((cycle-20) % 40 ===0) {
    part1 += xRegister * cycle;
  }

}
console.log('');
console.log('Part 1: %i', part1);
