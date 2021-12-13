import { readInput } from '../../helpers.js';

const [dotStr, foldStr] = readInput().split('\n\n');

const dots = dotStr.split('\n').map(line => line.split(',').map(i => +i));
const folds = foldStr.split('\n').map(line => {

  const [,direction,position] = line.match(/(x|y)=([0-9]+)$/);
  return [direction, +position];

});

function fold(dir, position, dots) {

  const newDots = new Map();

  for(const [x, y] of dots) {

    const newY = dir==='y' && y>position ? position-(y-position) : y;
    const newX = dir==='x' && x>position ? position-(x-position) : x;
    newDots.set(`${newX},${newY}`, [newX, newY]);

  }

  return Array.from(newDots.values());

}

console.log('Part 1: %d', fold(...folds[0], dots).length);

let currentDots = dots;


for(const f of folds) {
  currentDots = fold(...f, currentDots);
}

console.log('Part 2');

let maxX = 0;
let maxY = 0;

const dotSet = new Set();
for(const dot of currentDots) {
  if (dot[0] > maxX) maxX = dot[0];
  if (dot[1] > maxY) maxY = dot[1];
  dotSet.add(`${dot[0]},${dot[1]}`);
} 

for(let y=0; y<=maxY; y++) {
  let str ='';
  for(let x=0; x<=maxX; x++) {

    if (dotSet.has(`${x},${y}`)) {
      str += '#';
    } else {
      str += ' ';
    }
  }
  console.log(str);
}


