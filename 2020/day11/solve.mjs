import { readFileSync } from 'fs';

const startGrid = readFileSync('./input', 'utf-8')
  .trim()
  .split('\n');

let currentGrid = startGrid;


while(true) {

  const newGrid = stepPart1(currentGrid);
  if (gridEqual(newGrid, currentGrid)) {
    break;
  }

  currentGrid = newGrid;

}

console.log('Part 1: %i', countAllOcc(currentGrid));

let count=0;

currentGrid = startGrid;
while(true) {

  const newGrid = stepPart2(currentGrid);

  if (gridEqual(newGrid, currentGrid)) {
    break;
  }

  currentGrid = newGrid;

}

console.log('Part 2: %i', countAllOcc(currentGrid));



/**
 * Takes a grid and runs 1 game loop, and returns the new state.
 */
function stepPart1(grid) {

  const out = [];
  for(let y=0; y<grid.length; y++) {

    let newRow = '';

    for(let x=0; x<grid[y].length; x++) {
      const oldState = grid[y][x];
      if (oldState === '.') {
        newRow += '.';
        continue;
      }
      const nearbyOccupied = getOcc1(grid, x, y);

      if (nearbyOccupied === 0) {
        newRow += '#';
      } else if (nearbyOccupied >= 4) {
        newRow += 'L';
      } else {
        newRow += oldState;
      }
    }

    out.push(newRow);
  }
  return out;

}


/**
 * Returns true if the grids are identical.
 *
 * There's definitely a faster way to do this, but I don't think the speed is gonna matter.
 */
function gridEqual(a, b) {

  for(let y=0; y < a.length; y++) {
    if (a[y] !== b[y]) return false;
  }
  return true;

}

/**
 * Given a grid, count how many seats around the x and y coordinates are
 * occupied. Step 1 rules
 */
function getOcc1(grid, x, y) {

  // We're ok with some of these being undefined.
  // I do wonder if there's an easier way
  const seats = [
    grid[y-1]?.[x-1],
    grid[y-1]?.[x],
    grid[y-1]?.[x+1],

    grid[y][x-1],
    grid[y][x+1],

    grid[y+1]?.[x-1],
    grid[y+1]?.[x],
    grid[y+1]?.[x+1],
  ];

  return seats.filter(seat => seat === '#').length;

}
/**
 * Takes a grid and runs 1 game loop, and returns the new state.
 */
function stepPart2(grid) {

  const out = [];
  for(let y=0; y<grid.length; y++) {

    let newRow = '';

    for(let x=0; x<grid[y].length; x++) {
      const oldState = grid[y][x];
      if (oldState === '.') {
        newRow += '.';
        continue;
      }
      const nearbyOccupied = getOcc2(grid, x, y);

      if (nearbyOccupied === 0) {
        newRow += '#';
      } else if (nearbyOccupied >= 5) {
        newRow += 'L';
      } else {
        newRow += oldState;
      }
    }

    out.push(newRow);
  }
  return out;

}
/**
 * Given a grid, count how many seats around the x and y coordinates are
 * occupied. Step 2 rules
 */
function getOcc2(grid, x, y) {

  const deltas = [
    [-1, -1],
    [-1, 0],
    [-1, +1],

    [0, -1],
    [0, +1],

    [+1, -1],
    [+1, 0],
    [+1, +1],
  ];

  let count = 0;

  for(const [dY, dX] of deltas) {

    let nX = x;
    let nY = y;
    do {

      nX+=dX;
      nY+=dY;

    } while(grid[nY]?.[nX] === '.');

    count += grid[nY]?.[nX] === '#' ? 1 : 0;
    if (count>=5) {
      return 5;
    }

  }

  return count;

}

function countAllOcc(grid) {

  let count = 0;
  for(const row of grid) {
    count += row.match(/#/g)?.length || 0;
  }
  return count;

}
