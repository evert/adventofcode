import { readGrid, Grid } from '../../helpers.js';

const input = readGrid();
const iterations = 100;

function conwayRun(neighbourFunction) {

  let currentGrid = input;
  for(let i=0; i<iterations; i++) {

    currentGrid = currentGrid.map((c, x, y) => neighbourFunction(c, x, y, currentGrid));

  }

  let count = 0;
  currentGrid.walk(c => count+=(c==='#'?1:0));
  return count;

}

const part1 = conwayRun((c, x, y, grid) => {

  const neighbours = grid.get8(x, y).filter( n => n==='#').length;
  if (c==='#') {
    if (neighbours === 2 || neighbours === 3) return '#';
    return '.';
  } else {
    if (neighbours === 3) return '#';
    return '.';
  }

});

const part2 = conwayRun((c, x, y, grid) => {

  if (
    (x===0 && y===0) ||
    (x===0 && y===grid.maxY-1) ||
    (x===grid.maxX-1 && y===grid.maxY-1) ||
    (x===grid.maxX-1 && y===0)
  ) return '#';
  const neighbours = grid.get8(x, y).filter( n => n==='#').length;
  if (c==='#') {
    if (neighbours === 2 || neighbours === 3) return '#';
    return '.';
  } else {
    if (neighbours === 3) return '#';
    return '.';
  }

}); 

console.log('Part 1: %d', part1);
console.log('Part 2: %d', part2);
