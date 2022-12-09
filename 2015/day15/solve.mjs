import { readInput } from '../../helpers.js';

const input = Object.fromEntries(
  readInput()
    .split('\n')
    .map(line => {
      const [ingredient, stats] = line.split(':');
      const statsList = stats.split(',').map( stat => {
        const s = stat.split(' ')
        return [s[1], +s[2]];
      });
      return [ingredient, Object.fromEntries(statsList)];
    })
);

const properties = [
  'capacity',
  'durability',
  'flavor',
  'texture'
];


function *generatePermutations(ingredientNames, capacityLeft = 100) {

  if(ingredientNames.length===1) {
    yield { [ingredientNames[0]]: capacityLeft };
    return;
  }
  const [ing, ...next] = ingredientNames;
  for(let i=1; i<capacityLeft-ingredientNames.length; i++) {
    for(const per of generatePermutations(next, capacityLeft-i)) {
      yield {
        [ing]: i,
        ...per,
      }
    };
  }

}

let bestScore = 0;
let bestScore2 = 0;

for(const perm of generatePermutations(Array.from(Object.keys(input)))) {

  const s = score(perm);
  const cals = calories(perm);
  if (s>bestScore) bestScore = s;
  if (s>bestScore2 && cals===500) bestScore2 = s;

}

console.log('Part 1: %i', bestScore);
console.log('Part 2: %i', bestScore2);

function score(ingredients) {

  let total = 1;

  for(const p of properties) {

    let s = 0;
    for(const [i, q] of Object.entries(ingredients)) {
      s += input[i][p] * q;
    }

    if (s<=0) s=0;
    total *= s;

  }

  return total;

}

function calories(ingredients) {

  let total = 0;

  for(const [i, q] of Object.entries(ingredients)) {
    total += input[i]['calories'] * q;
  }

  return total;

}
