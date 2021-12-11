import { readInput, commonChars } from '../../helpers.js';

const input = readInput().split('\n');

function isNice1(str) {

  return (
    commonChars(str, 'aeiou').length >= 3 
    && str.match(/([a-z])\1/) 
    && !str.match(/ab|cd|pq|xy/)
  );

}
function isNice2(str) {

  return (
    str.match(/([a-z]{2})(.*)\1/)
    && str.match(/([a-z])[a-z]\1/)
  );

}

console.log('Part 1: %d', input.filter(i => isNice1(i)).length);
console.log('Part 2: %d', input.filter(i => isNice2(i)).length);
