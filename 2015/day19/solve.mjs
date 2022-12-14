import { readInput } from '../../helpers.js';

const [
  replacementStr,
  startMol
] = readInput().split('\n\n');

const replacements = replacementStr
  .split('\n')
  .map(line => line.split(' => '));

const results = new Set();
const alsoResults = [];

for(const [before, after] of replacements) {

  let position = 0;
  while(startMol.indexOf(before, position)!==-1) {
    let index = startMol.indexOf(before,position);
    const start = index > 0 ? startMol.substr(0,index) : '';
    const end = startMol.substr(index+before.length);
    const newMol = start + after + end;
    results.add(newMol);
    alsoResults.push(newMol);
    position = index+1;
  }

}

console.log('Part 1: %i (not %i)', results.size, alsoResults.length);

let best = Infinity;
let smallestString = Infinity;
const skipBranches = new Set();

const shuffle = (arr) => {

  return arr
    .map(item => [item, Math.random()])
    .sort((a, b) => a[1]-b[1])
    .map(([item]) => item);
}

function traverse(mol, count = 0) {

  if (skipBranches.has(mol)) return;

  let foundOne = false;
  /**
   * For some reason randomizing this makes this perform great, but not doing so makes it
   * run forever. I got this off reddit so bit of a cheat.
   */
  for(const [before, after] of shuffle(replacements)) {

    if (mol.includes(after)) {

      foundOne = true;
      const newMol = mol.replace(after, before);
      if (newMol.length < smallestString) {
        smallestString = newMol.length;
        console.log('Smallest string: %i', smallestString);
      }
      if (newMol==='e') {
        console.log('Found solution at count: ' + count);
        if (count<best) best = count;
        skipBranches.add(mol);
        return;
      }

      traverse(newMol, count+1);

    }

  }
  if (!foundOne) {
    console.log('Dead end at:' + mol);
  }
  skipBranches.add(mol);

}

traverse(startMol);

console.log('Part 2: %i', best);
