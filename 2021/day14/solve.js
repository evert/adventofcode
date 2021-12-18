import { readInput } from '../../helpers.js';

const [template, rulesStr] = readInput().split('\n\n');
const rules = new Map(rulesStr.split('\n').map(
  rule => {
    const parts = rule.split(' ');
    return [parts[0], parts[2]];
  }
));


/**
 * @param {string} input
 */
function step(input) {

  let output = '';

  for(let idx=0; idx<input.length-1; idx++) {

    const key = input.substr(idx, 2);
    if (rules.has(key)) {
      output += input[idx] + rules.get(key);
    } else {
      throw new Error('no match');
    }

  }
  output += input[input.length-1];

  rules.set(input, output);

  return output;

}

function getResult(steps) {

  let current = template;

  for(let s=0; s < steps; s++) {

    current = step(current);

  }
  let most=null;
  let least=Infinity;

  for(const [char, count] of countCharacters(current)) {
    if (count>most) {
      most = count;
    }
    if (count<least) {
      least = count;
    }
  }
  return most-least;

}

console.log('Part 1: %d', getResult(10));

function countCharacters(str) {

  const result = new Map();
  for(let i=0;i<str.length;i++) {
    result.set(
      str[i],
      result.has(str[i]) ? result.get(str[i]) + 1 : 1
    );
  }
  return result;

}
