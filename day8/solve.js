const fs = require('fs');

const instructions = fs.readFileSync('./input', 'utf-8')
  .trimEnd()
  .split('\n')
  .map( line => {
    const r = line.split(' ');
    return [r[0], parseInt(r[1],10)];
  });


let cursor = 0;
let acc = 0;

const visited = new Set();

while(true) {

  if (visited.has(cursor)) {
    break;
  }
  visited.add(cursor);
  const [instruction, arg] = instructions[cursor];
  switch(instruction) {
    case 'acc' :
      acc+=arg;
      cursor++;
      break;
    case 'jmp' :
      cursor+=arg;
      break;
    case 'nop' :
      cursor++;
      break;
    default:
      throw new Error(`Unknown instruction: ${instruction}`);
  }

}

console.log('Part 1 answer: %i', acc);
