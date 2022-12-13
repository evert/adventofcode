import { readInput } from '../../helpers.js';

/**
 * @typedef {number|Val[]} Val
 */


/**
 * @type {[Val,Val]} pairs
 */
const pairs = readInput()
  .split('\n\n')
  .map( pair => pair
    .split('\n')
    .map( line => JSON.parse(line) )

  ); 


let orderedPairIndices = 0;

for(let i=0; i<pairs.length; i++) {

  const [a, b] = pairs[i];
  if (inOrder(a,b) === -1) {
    orderedPairIndices+=i+1;
  }

}

console.log('Part 1: %d', orderedPairIndices);

const dividers = [
  [[2]],
  [[6]]
];

const allPackets = [
  ...pairs.reduce((acc, cur) => [...acc, ...cur], []),
  dividers[0],
  dividers[1],
].sort( (a, b) => inOrder(a, b));

let dividerIndices = 1;

for(let i=0; i<allPackets.length; i++) {

  if (dividers.includes(allPackets[i])) dividerIndices *= (i+1);
}

console.log('Part 2: %d', dividerIndices);

/**
 * Returns -1 if a is before b, 1 if b is before a, 0 if they are equal
 *
 * @param {Val} a
 * @param {Val} b
 * @returns {number}
 */
function inOrder(a,b) {

  if (a === undefined) {
    return -1;
  }
  if (b === undefined) {
    return 1;
  }

  if (typeof a === 'number' && typeof b === 'number') {
    if (a < b) return -1;
    if (b < a) return 1;
    return 0;
  }

  a = Array.isArray(a) ? a : [a];
  b = Array.isArray(b) ? b : [b];

  for(let i=0; i<Math.max(a.length,b.length); i++) {

    const result = inOrder(a[i], b[i]);
    if (result !== 0) {
      return result;
    }

  }

  return 0;

}


