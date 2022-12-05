import { readInput, commonChars } from '../../helpers.js';

const [stackInput, moveInput] = readInput(true).split('\n\n');

const stackInputArr = stackInput
  .split('\n');


const stacks = [];

for(let column = 1; column < stackInputArr.at(-1).length; column+=4) {

  const stack = [];

  for(let row = stackInputArr.length-2; row >= 0; row--) {

    const item = stackInputArr.at(row).at(column);
    if (item!==' ') {
      stack.push(item);
    } else {
      break;
    }

  }
  stacks.push(stack);

}

const moves = moveInput
  .trim()
  .split('\n')
  .map(row =>
    row
      .match(/^move ([0-9]+) from ([0-9]+) to ([0-9]+)$/)
      .slice(1)
      .map(num => +num)
  );

const stacks1 = JSON.parse(JSON.stringify(stacks));

for(const [count, from, to] of moves) {

  for(let i=0; i<count; i++) {
    const item = stacks1.at(from-1).pop();
    stacks1.at(to-1).push(item);
  }

}

console.log('Part 1: %s',
  stacks1
    .map(stack => stack.at(-1))
    .join('')
);

const stacks2 = JSON.parse(JSON.stringify(stacks));


for(const [count, from, to] of moves) {

  const transitStack = [];

  for(let i=0; i<count; i++) {
    transitStack.push(stacks2.at(from-1).pop());
  }
  stacks2.at(to-1).push(...transitStack.reverse());

}

console.log('Part 2: %s',
  stacks2
    .map(stack => stack.at(-1))
    .join('')
);
