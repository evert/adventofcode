import { readInput, commonChars } from '../../helpers.js';

const input = readInput();

const rucksacks = input.split('\n');

let part1 = 0;

function priority(set) {

  let score = 0;
  for(const char of set.values()) {

    const code = char.charCodeAt(0);
    score += code>=97 ? code-96 : code - 38;

  }
  return score;

}


for(const rucksack of rucksacks) {

  const comp1 = rucksack.slice(0, rucksack.length/2);
  const comp2 = rucksack.slice(rucksack.length/2);

  const common = commonChars(comp1, comp2);

  // Remove dupes
  const set = new Set(common.split(''));
  part1 += priority(set);

}

console.log('Part 1: %d', part1);

let part2 = 0;

for(let i=0; i < rucksacks.length; i+=3) {

  const common = commonChars(
    commonChars(
      rucksacks[i],
      rucksacks[i+1]
    ),
    rucksacks[i+2]
  );

  part2 += priority(new Set([common[0]]));

}
console.log('Part 2: %d', part2);
