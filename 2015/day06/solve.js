import { readInput } from '../../helpers.js';

const parser = /(turn on|turn off|toggle) ([0-9]+),([0-9]+) through ([0-9]+),([0-9]+)/;

const instructions = readInput()
  .split('\n')
  .map( line => {
    const matches = line.match(parser);
    return [matches[1], [+matches[2], +matches[3]], [+matches[4], +matches[5]]];
  });

const grid1 = new Set();
for(const instruction of instructions) {

  switch(instruction[0]) {
    case 'turn on':
      walkXy(instruction, (xy) => {
        grid1.add(xy);
      });
      break;
    case 'turn off':
      walkXy(instruction, (xy) => {
        grid1.delete(xy);
      });
      break;
    case 'toggle':
      walkXy(instruction, (xy) => {
        if (grid1.has(xy)) {
          grid1.delete(xy);
        } else {
          grid1.add(xy);
        }
      });
      break;

  }

}

console.log('Part 1: %d', grid1.size);

const grid2 = new Map();

for(const instruction of instructions) {

  switch(instruction[0]) {
    case 'turn on':
      walkXy(instruction, (xy) => {
        gridInc(xy,1);
      });
      break;
    case 'turn off':
      walkXy(instruction, (xy) => {
        gridInc(xy,-1);
      });
      break;
    case 'toggle':
      walkXy(instruction, (xy) => {
        gridInc(xy, 2);
      });
      break;

  }

}

console.log('Part 2: %d',
  Array.from(grid2.values()).reduce((acc, cur) => acc+cur, 0)
);


function walkXy(instruction, cb) {

  const x1 = Math.min(instruction[1][0], instruction[2][0]);
  const x2 = Math.max(instruction[1][0], instruction[2][0]);
  const y1 = Math.min(instruction[1][1], instruction[2][1]);
  const y2 = Math.max(instruction[1][1], instruction[2][1]);

  for(let x=x1; x<=x2; x++) {
    for(let y=y1; y<=y2; y++) {
      cb(`${x},${y}`);
    }
  }

}
function gridInc(xy, val) {

  if (grid2.has(xy)) {
    grid2.set(
      xy,
      Math.max(
        grid2.get(xy) + val,
        0
      )
    );
  } else {
    grid2.set(xy, Math.max(0+val,0));
  }
}

