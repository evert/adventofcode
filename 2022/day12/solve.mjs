import { readGrid } from '../../helpers.js';

const input = readGrid();

let startPos, endPos;

/**
 * Finding start, end and correct heights
 */
const grid = input.map((c, x, y) => {

  switch(c) {

    case 'S' :
      startPos = [x,y];
      return 'a';
    case 'E' :
      endPos = [x,y];
      return 'z';
    default:
      return c;

  }

});

let bestPart1 = Infinity;
let bestPart2 = Infinity;

const distances = new Map();
distances.set(endPos.join(','),0);

function findDistances(currentDistance, x, y) {

  const legalMoves = getLegalMoves([x,y]);

  for(const newPos of legalMoves) {

    if (posEqual(newPos, startPos)) {
      if (currentDistance+1 < bestPart1) {
        bestPart1 = currentDistance+1;
      }
    }
    if (grid.at(...newPos) === 'a') {
      if (currentDistance+1 < bestPart2) {
        bestPart2 = currentDistance+1;
      }

    }

    const alreadyFoundDistance = distances.get(newPos.join(','));
    if (alreadyFoundDistance===undefined || alreadyFoundDistance > currentDistance+1) {
      distances.set(newPos.join(','), currentDistance+1);
      findDistances(currentDistance+1, ...newPos);
    }

  }

}

findDistances(0, ...endPos);

console.log('Part 1: %i', bestPart1);
console.log('Part 2: %i', bestPart2);

function getLegalMoves(pos) {

  const possibleMoves = [
    [pos[0]-1, pos[1]],
    [pos[0]+1, pos[1]],
    [pos[0],   pos[1]-1],
    [pos[0],   pos[1]+1],
  ];

  return possibleMoves.filter(([x,y]) => {

    if (x<0 || y<0 || x>=grid.maxX || y>=grid.maxY) {
      // out of bounds
      return false;
    }

    if (!isLegalMove(pos, [x,y])) {
      return false;
    }

    return true;

  });

}

/**
 * Note that this checks the opposite move (walk backwards from end)
 */
function isLegalMove(toPos, fromPos) {

  const fromElev = grid.at(...fromPos).charCodeAt();
  const toElev = grid.at(...toPos).charCodeAt();

  // console.log(fromElev, toElev, (toElev-fromElev)<=1);

  return (toElev-fromElev)<=1;

}
function posEqual(pos1, pos2) {

  return pos1[0]===pos2[0] && pos1[1]===pos2[1];

}
