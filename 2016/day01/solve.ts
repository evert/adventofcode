import { readInput } from '../../helpers.js';
import { Point } from '../../gridstuff.js';

const input:['L'|'R',number][] = readInput()
  .split(', ')
  .map(move => [move.substr(0,1) as 'L'|'R', +move.substr(1)]);

let position: Point = [0,0];
let heading = 0;
let part2 = null;

const locations = new Set();
locations.add(position.join(','));

for(const [direction, distance] of input) {

  heading = (heading + (direction === 'R' ? 1 : -1));
  heading = heading < 0? heading+4 : heading % 4;
  let move: Point;
  switch(heading) {
    case 0: move = [0,-1]; break;
    case 1: move = [1,0]; break;
    case 2: move = [0,1]; break;
    case 3: move = [-1,0]; break;
    default: throw new Error('bug!');
  }
     
  for(let i=0; i < distance; i++) {
    
    position = [position[0]+move[0], position[1]+move[1]];

    if (!part2 && locations.has(position.join(','))) {
      console.log('got it');
      part2 = [...position];
    }
    locations.add(position.join(','));
  }


}

console.log('Part 1: %i', Math.abs(position[0] + position[1]));
console.log('Part 2: %i', Math.abs(part2![0] + part2![1]));
