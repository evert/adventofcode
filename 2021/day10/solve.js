const fs = require('fs');

const lines = fs
  .readFileSync('./input', 'utf-8')
  .trim()
  .split('\n');

const part1ScoreTable = {
  ')': 3,
  ']': 57,
  '}': 1197,
  '>': 25137
};

const part2ScoreTable = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4 
};


const openers = {
  '<': '>',
  '[': ']',
  '(': ')',
  '{': '}'
};

const closers = Object.fromEntries(
  Object.entries(openers).map(([k,v]) => [v,k])
);

let part1 = 0;
const part2Scores = [];

lineLoop: for(const line of lines) {

  const stack = [];

  for(const char of line.split('')) {

    if (char in openers) {
      stack.push(char);
    } else {
      const opener = closers[char];
      if (opener !== stack[stack.length-1]) {
        // Found corrupt line
        part1 += part1ScoreTable[char];
        continue lineLoop;
      } else {
        stack.pop();
      }
    }

  }

  let p2Score = 0;

  for(const s of stack.reverse()) {

    p2Score = (p2Score * 5) + part2ScoreTable[openers[s]];
    
  }

  part2Scores.push(p2Score);

}

const part2 = part2Scores.sort((a,b)=>a-b)[(part2Scores.length-1)/2];


console.log('Part 1: %d', part1);
console.log('Part 2: %d', part2);
