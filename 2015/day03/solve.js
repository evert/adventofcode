import { readInput } from '../../helpers.js';

const data = readInput();


console.log('Part 1: %d', part1());
console.log('Part 1: %d', part2());


function part1() {

  return getVisitedSet(data).size;

}

function part2() {

  let strs = ['', ''];
  for(let ii=0; ii < data.length; ii++) {
    strs[ii%2] += data[ii];
  }

  return new Set([
    ...getVisitedSet(strs[0]).values(),
    ...getVisitedSet(strs[1]).values(),
  ]).size;

}

/**
 * @returns {Set<string>}
 */
function getVisitedSet(instructions) {

  const visited = new Set();

  let x=0, y=0;

  for(const action of instructions.split('')) {

    let key = `${x},${y}`;
    visited.add(key);

    switch(action) {
      
      case '^': y--; break;
      case '>': x++; break;
      case 'v': y++; break;
      case '<': x--; break;
      default:
        throw new Error('Oh no');

    }

  }

  return visited;

}
