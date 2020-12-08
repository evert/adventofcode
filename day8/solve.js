const fs = require('fs');

const instructions = fs.readFileSync('./input', 'utf-8')
  .trimEnd()
  .split('\n')
  .map( line => {
    const r = line.split(' ');
    return [r[0], parseInt(r[1],10)];
  });


/**
 * @returns [boolean, number] - First boolean says whether the program
 *                            - second what the last accumilator value is
 */
function run(instructions) {
  let cursor = 0;
  let acc = 0;

  const visited = new Set();

  while(true) {

    if (visited.has(cursor)) {
      return [false, acc];
      break;
    }

    if (cursor===instructions.length) {
      return [true, acc];
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

}


console.log('Part 1 answer: %i', run(instructions)[1]);

// Brute force
for(let ii=0; ii < instructions.length; ii++) {

  const newInstructions = [...instructions];
  const mIns = newInstructions[ii][0];
  if (mIns === 'acc') {
    continue;
  }
  newInstructions[ii] = [
    mIns === 'jmp' ? 'nop' : 'jmp',
    newInstructions[ii][1]
  ];

  const result = run(newInstructions);
  if (result[0]) {
    console.log('Part 2 answer: %i', result[1]);
    break;
  }

}
