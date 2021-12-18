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

  if (steps === 0) {
    return countCharacters(str);
  }

  let counts = {};

  for(let idx=0; idx<str.length-1; idx++) {

    const key = str.substr(idx, 2);
    if (rules.has(key)) {
      const innerCount = expand(str[idx] + rules.get(key) + str[idx+1], steps-1);
      // Remove the last character so we don't double-count it.
      innerCount[str[idx+1]]--;
      counts = mergeCounts(counts, innerCount);
    } else {
      throw new Error('no match');
    }

  }

  // Adding the count for the final character
  const lastChar = str[str.length-1];
  counts[lastChar] = (counts[lastChar] ?? 0)+1;
  return counts;

});

console.log('Part 1: %d', getResult(10));
console.log('Part 1: %d', getResult(40));

function getResult(steps) {

  const out = expand(template, steps);
  console.log(out);

  let most=null;
  let least=Infinity;

  for(const [char, count] of Object.entries(out)) {
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

  const result = {};
  for(let i=0;i<str.length;i++) {
    result[str[i]] = (result[str[i]] ?? 0)+1;
  }
  return result;

}

function mergeCounts(count1, count2) {
  const newCount = {...count1};
  for(const [k,v] of Object.entries(count2)) {
    newCount[k] = (newCount[k] ?? 0) + v;
  }
  return newCount;
}

function memoize(cb) {

  const cache = new Map();

  return (...args) => {

    const argStr = args.join('|');
    
    if (cache.has(argStr)) {
      return {...cache.get(argStr)};
    }

    const result = cb(...args);
    cache.set(argStr, {...result});
    return result;
  };

}

