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
export function readInput() {

  return fs.readFileSync('./input', 'utf-8').trim();

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
