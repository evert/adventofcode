/**
 * This failed because of memory requirements
 */
import { readInput } from '../../helpers.js';

const [template, rulesStr] = readInput().split('\n\n');
const rules = new Map(rulesStr.split('\n').map(
  rule => {
    const parts = rule.split(' ');
    return [parts[0], parts[2]];
  }
));


/**
 * This function expands an entire string many times. 
 *
 * @param {string} str
 * @param {number} steps
 * @returns {string}
 */
const expand = memoize((str, steps) => {

  if (steps === 0) return str;

  let output = '';

  for(let idx=0; idx<str.length-1; idx++) {

    const key = str.substr(idx, 2);
    if (rules.has(key)) {
      output += expand(str[idx] + rules.get(key) + str[idx+1], steps-1).slice(0,-1);
    } else {
      throw new Error('no match');
    }

  }
  output += str[str.length-1];
  return output;

});

function memoize(cb) {

  const cache = new Map();

  return (...args) => {

    const argStr = args.join('-');
    if (cache.has(argStr)) {
      return cache.get(argStr);
    }

    const result = cb(...args);
    cache.set(argStr, result);
    return result;
  };

}



console.log('Part 1: %d', getResult(10));
console.log('Part 2: %d', getResult(40));

function getResult(steps) {

  const out = expand(template, steps);

  let most=null;
  let least=Infinity;

  for(const [char, count] of countCharacters(out)) {
    if (count>most) {
      most = count;
    }
    if (count<least) {
      least = count;
    }
  }
  return most-least;

}

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
