import { readInput } from '../../helpers.js';

const input = readInput();

function findUniqueSequence(length) {

  for (let i = 0; i < input.length-length; i++) {

    const s = new Set(input.substr(i,length).split(''));
    if (s.size === length) {
      return i+length;
    }

  }

}

console.log('Part 1: %i', findUniqueSequence(4));
console.log('Part 2: %i', findUniqueSequence(14));
