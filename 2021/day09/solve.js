const fs = require('fs');


const grid =
  fs.readFileSync('./input', 'utf-8')
  .trim()
  .split('\n')
  .map( line =>
    line.trim().split('').map(v => +v)
  );


let part1 = 0;
const basins = [];

walkGrid((x, y, v) => {

  if (getSurroundingValues(x, y).filter( v2 => v2<=v).length === 0) {
    part1 += 1 + v;
    basins.push(findBasinSize(x,y));

  }

});

const part2 = basins
  .sort((a,b) => b-a)
  .slice(0,3)
  .reduce((acc, cur) => acc*cur,1);


console.log('Part 1: %d', part1);
console.log('Part 2: %d', part2);


function walkGrid(cb) {

  for (let y=0; y < grid.length; y++) {

    for (let x=0; x < grid[y].length; x++) {

      cb(x, y, grid[y][x]);

    }

  }

}

function getCellValue(x, y) {

  return grid[y]?.[x];

}

function getSurroundingValues(x, y) {

  return [
    getCellValue(x-1, y),
    getCellValue(x+1, y),
    getCellValue(x, y-1),
    getCellValue(x, y+1),
  ].filter(v => v!==undefined);

}

function findBasinSize(x,y) {

  const basinMembers = new Set();
  exploreBasin(basinMembers, x, y);

  return basinMembers.size;

}

/**
 * @param {Set<string>}basinMembers
 * @param {number}x
 * @param {number}y
 */
function exploreBasin(basinMembers, x, y) {

  if (basinMembers.has(`${x},${y}`)) {
    return;
  }

  const v = getCellValue(x,y);
  if (v===undefined) {
    return;
  }
  if (v!==9) {
    basinMembers.add(`${x},${y}`);
    exploreBasin(basinMembers, x-1, y);
    exploreBasin(basinMembers, x+1, y);
    exploreBasin(basinMembers, x, y-1);
    exploreBasin(basinMembers, x, y+1);
  }

}
