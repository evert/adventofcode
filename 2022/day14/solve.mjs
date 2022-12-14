import { readInput, Grid } from '../../helpers.js';

const lines = readInput()
  .split('\n')
  .map(line =>
    line
      .split(' -> ')
      .map( xy => xy.split(',').map(c => +c))
  );


/**
 * Figuring the grid size
 */
const maxCoords = [1000,0];

for(const line of lines) {

  for(const [x,y] of line) {

    if (y>maxCoords[1]) maxCoords[1] = y;

  }

}
console.log(maxCoords);

const gridInput = [];
for(let y=0;y<maxCoords[1]+3;y++) {
  gridInput.push('.'.repeat(maxCoords[0]+2));
}


let grid = new Grid(gridInput);

/**
 * Lets draw some lines
 */

for(const line of lines) {

  let currentCoord = line[0];

  for(let i=1; i<line.length; i++) {

    const destination = line[i];
    const direction = [
      getDest(currentCoord[0], destination[0]),
      getDest(currentCoord[1], destination[1])
    ];

    grid.set(...currentCoord,'#');

    while(!coordEqual(currentCoord, destination)) {

      currentCoord = [
        currentCoord[0]+direction[0],
        currentCoord[1]+direction[1],
      ];
      grid.set(...currentCoord,'#');

    }

  }


}
// Make a copy
const originalGrid = grid.clone();

let sand = 0;

/**
 * Drop that sand
 */
while(true) {

  let sandCoord = [500,0];
  sand++;
  while(true) {
    if (sandCoord[1]>=grid.maxY-1) {
      break;
    }
    if (grid.at(sandCoord[0],sandCoord[1]+1) === '.') {
      sandCoord[1]++;
    } else if (grid.at(sandCoord[0]-1,sandCoord[1]+1) === '.') {
      sandCoord[0]--;
      sandCoord[1]++;
    } else if (grid.at(sandCoord[0]+1,sandCoord[1]+1) === '.') {
      sandCoord[0]++;
      sandCoord[1]++;
    } else {
      grid.set(...sandCoord, 'o');
      break;
    }
  }
  if (sandCoord[1]>=grid.maxY-1) {
    break;
  }

}

console.log('Part 1: %i', sand-1);

grid = originalGrid.clone();
for(let x=0; x<maxCoords[0]; x++) {
  grid.set(x, maxCoords[1]+2, '#');

}

sand = 0;
/**
 * Drop that sand again
 */
while(true) {

  let sandCoord = [500,0];
  sand++;
  display();
  while(true) {
    if (grid.at(sandCoord[0],sandCoord[1]+1) === '.') {
      sandCoord[1]++;
    } else if (grid.at(sandCoord[0]-1,sandCoord[1]+1) === '.') {
      sandCoord[0]--;
      sandCoord[1]++;
    } else if (grid.at(sandCoord[0]+1,sandCoord[1]+1) === '.') {
      sandCoord[0]++;
      sandCoord[1]++;
    } else {
      grid.set(...sandCoord, 'o');
      break;
    }
  }
  if (sandCoord[1]===0) break;

}

console.log('Part 2: %i', sand);


function display() {
  const displayGrid = new Grid(
    grid.data.map(line => line.substr(400,200))
  );
  displayGrid.log();
  console.log('');
}

function coordEqual(coord1, coord2) {

  return coord1[0]===coord2[0] && coord1[1]===coord2[1];

}

function getDest(num1, num2) {

  if (num1 < num2) return 1;
  if (num1 > num2) return -1;
  return 0;

}
