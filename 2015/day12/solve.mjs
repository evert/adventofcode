import { readInput } from '../../helpers.js';

const input = JSON.parse(readInput());

function traverse(data, ignoreRed = false) {

  if (data===null || typeof data === 'string' || typeof data === 'boolean') {
    return 0;
  }
  if (typeof data === 'number') {
    return data;
  }
  if (Array.isArray(data)) {
    return data.reduce((acc, cur) => acc + traverse(cur, ignoreRed), 0);
  }
  if (ignoreRed && Array.from(Object.values(data)).includes('red')) return 0;
  return Object.values(data).reduce((acc, cur) => acc + traverse(cur, ignoreRed), 0);

}

console.log('Part 1: %i', traverse(input));
console.log('Part 2: %i', traverse(input, true));
