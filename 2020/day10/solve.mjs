import { readFileSync } from 'fs';

const numbers = readFileSync('./input', 'utf-8')
  .trimEnd().split("\n")
  .map(n => parseInt(n,10))
  .sort((a, b) => a-b);

let last = 0;
const jumps = [
  0,
  0,
  0,
  1,
];

for(const num of numbers) {

  const jump = num - last;
  jumps[jump]++;
  last = num;

}

console.log('Part 1', jumps[1] * jumps[3]);

const memoizedResults = new Map();

// Lets try a recursive thing first.
function countArrangements(numArr, bottom) {

  const cacheString = numArr.join('|') + '|' + bottom;
  if (memoizedResults.has(cacheString)) {
    return memoizedResults.get(cacheString);
  }

  if (numArr.length === 0) {
    return 1;
  }
  let result = 0;
  while(numArr[0] <= bottom + 3 && numArr.length) {
    const newBottom = numArr.shift();
    result += countArrangements([...numArr], newBottom);
  }

  memoizedResults.set(cacheString, result);
  return result;

}

console.log('Part 2', countArrangements(numbers, 0));
