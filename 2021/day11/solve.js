import { readInput } from '../../helpers.js';

const grid = readInput()
  .split('\n')
  .map( row => row.split('').map(o => +o));

let flashes = 0;
const iterations = 100;

console.log('Before any steps:');
printGrid();
console.log("\n");

for(let iter=0; iter<iterations; iter++) {
  tick();
  console.log(`After step ${iter+1}`);
  printGrid();
  console.log("\n");
}

console.log('Part 1: %d', flashes);

let iter = iterations-1;
do {

  iter++; 
  tick();
  printGrid();

} while(!isAll0());

console.log('Part 2: %d', iter+1);

function tick() {

  walkGrid(incrementCell);
  walkGrid(processFlashes);
  walkGrid(resetToZero); 

}

function incrementCell(x,y) {

  const v = getCellValue(x,y);
  setCellValue(x,y,v+1);

}

function processFlashes(x,y,v) {
  if (v!==10) {
    return;
  }
  flashes++;
  setCellValue(x,y,v+1);
  walkAdjecent(x, y, (xA,yA,vA) => {
    vA = vA < 10 ? vA+1: vA;
    setCellValue(xA, yA, vA);
    processFlashes(xA, yA, vA);
  });

}

function resetToZero(x,y,v) {
  if (v >= 10) {
    setCellValue(x,y,0);
  }
}

function walkGrid(cb) {

  for (let y=0; y < grid.length; y++) {
    for (let x=0; x < grid[y].length; x++) {
      cb(x, y, grid[y][x]);
    }
  }

}

function isAll0() {
  let all0 = true;
  walkGrid((x,y,v) => all0 = v!==0 ? false : all0);
  return all0;
}

function walkAdjecent(x, y, cb) {

  [
    [x-1, y-1],
    [x-1, y],
    [x-1, y+1],
    [x,   y+1],
    [x+1, y+1],
    [x+1, y],
    [x+1, y-1],
    [x,   y-1]
  ].map( ([xA,yA]) => {

    if (xA>=0 && xA<10 && yA>=0 && yA<10) {
      //console.log(`${x},${y} -> ${xA},${yA} = ${getCellValue(xA, yA)}`);
      cb(xA,yA, getCellValue(xA,yA));

    }

  })

}


function setCellValue(x,y,v) {
  grid[y][x] = v;
}
function getCellValue(x,y) {
  return grid[y][x]; 
}
function printGrid() {

  console.log(grid.map( row => row.join('') ).join('\n'));

}



