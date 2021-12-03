const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split('\n')
  .map(row => row.split(' '))
  .map(row => [row[0], parseInt(row[1],10)]);

let depth = 0;
let horiz = 0;

for (const [dir, num] of input) {
  switch(dir) {
    case 'forward':
      horiz += num;
    break;
    case 'down' :
      depth += num;
      break;
    case 'up' :
      depth -= num;
      break;
    default:
      throw new Error('Unknown course: ' + dir);
  }
}

console.log('Part 1: %d', depth*horiz);

let aim = 0;
depth = 0;
horiz = 0;

for (const [dir, num] of input) {
  switch(dir) {
    case 'forward':
      horiz += num;
      depth += aim * num;
    break;
    case 'down' :
      aim += num;
      break;
    case 'up' :
      aim -= num;
      break;
    default:
      throw new Error('Unknown course: ' + dir);
  }
}

console.log('Part 2: %d', depth*horiz);
