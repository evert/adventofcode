import { readInputFields } from '../../helpers.js';

const instructions = readInputFields(' ');

const wires = new Map();
wires.xGet= key => {

  if (wires.has(key)) {
    return wires.get(key);
  }
  if (!Number.isNaN(+key)) {
    return +key;
  }

  throw new Error(`Unknown wire: ${key}`);

};


function initialize() {

  wires.clear();

  for(const instruction of instructions) {

    wires.set(
      instruction[instruction.length-1],
      instruction.slice(0, -2)
    );

  }
}

function getWireValue(wire) {

  if (!Number.isNaN(+wire)) {
    return +wire;
  }

  const instruction = wires.get(wire);
  let result;
  if (!instruction) {
    throw new Error(`Unknown wire: ${wire}`);
  }
  if (instruction.length===1) {
    result = getWireValue(instruction[0]);
  } else if (instruction[0] === 'NOT') {
    result = ~getWireValue(instruction[1]);
  } else {
    switch(instruction[1]) {
      case 'AND' :
        result = getWireValue(instruction[0]) & getWireValue(instruction[2]);
        break;
      case 'OR' :
        result = getWireValue(instruction[0]) | getWireValue(instruction[2]);
        break;
      case 'LSHIFT' :
        result = getWireValue(instruction[0]) << getWireValue(instruction[2]);
        break;
      case 'RSHIFT' :
        result = getWireValue(instruction[0]) >> getWireValue(instruction[2]);
        break;
      default:
        throw new Error(`Unsupported instruction: ${instruction.join(' ')}`);

    }
  }
  
  wires.set(wire, [result]);
  return result;

}

initialize();

const part1Result = getWireValue('a');
console.log('Part 1: %d', part1Result);

initialize();

wires.set('b', [part1Result]);

const part2Result = getWireValue('a');
console.log('Part 2: %d', part2Result);
