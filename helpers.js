import * as fs from 'fs';

/**
 * @param {string} haystack
 * @param {string} needle
 * @returns {number}
 */
export function countSubstr(haystack, needle) {

  return haystack.split(needle).length -1;

}

/**
 * @returns {string}
 */
export function readInput(noTrim = false) {

  const file = process.env.SAMPLE ? './sampleinput' : './input';
  const data= fs.readFileSync(file, 'utf-8');
  if (noTrim) {
    return data;
  } else {
    return data.trim();
  }

}

/**
 * Reads the input as a csv-like thing.
 *
 * @returns {string[][]}
 */
export function readInputFields(fieldSeparator = ',') {

  return readInput()
    .split('\n')
    .map(row => row.split(fieldSeparator));

}


/**
 * Given 2 strings, returns a new string with all the characters that appeared
 * in both.
 *
 * @param {string} input1
 * @param {string} input2
 * @returns {string}
 */
export function commonChars(input1, input2) {

  let out = '';
  for(let i=0; i<input1.length; i++){
    if (input2.includes(input1[i])) {
      out+=input1[i];
    }
  }
  return out;

}
