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

function findDistances(currentDistance, x, y, part = 1) {

  const legalMoves = getLegalMoves([x,y]);

  for(const newPos of legalMoves) {

    // console.log('%i,%i: %s', newPos[0], newPos[1], grid.at(...newPos));

    if (posEqual(newPos, startPos)) {
      if (currentDistance+1 < bestPart1) {
        // console.log('Found new best route. Distance: %i', currentDistance+1);
        bestPart1 = currentDistance+1;
      }
    }
    if (grid.at(...newPos) === 'a') {
      if (currentDistance+1 < bestPart2) {
        // console.log('Found new best route. Distance: %i', currentDistance+1);
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

/*
const route = [startPos];

let currentPos = [...startPos];

const alreadyVisited = new Set([startPos.join(',')]);

const completedRoutes = [];

let bestRouteLength = Infinity;

while(true) {

  const moveOrder = getMoveOrder(currentPos);

  if (moveOrder.length === 0) {
    if (route.length===0) {
      console.log('No more routes');
      break;
    }
    // Roll back
    currentPos = route.pop();
    continue;
  }
*/
  /*
  console.log(
    'Moving from %s to %s. Elevation %s->%s',
    currentPos.join(','),
    moveOrder[0].join(','),
    grid.at(...currentPos),
    grid.at(...moveOrder[0])
  );*/

/*
  GcurrentPos = moveOrder[0];

  alreadyVisited.add(currentPos.join(','));
  route.push(currentPos);

  if (posEqual(endPos, currentPos)) {
    console.log('Found route with length: %i', route.length);
    bestRouteLength = route.length;
    completedRoutes.push([...route]);
    currentPos = route.pop();
  }

  if (route.length > bestRouteLength) {
    currentPos = route.pop();
  }
  
}

console.log('Destination: ' + endPos.join(','));
const bestRoute = completedRoutes.sort((a,b) => a.length - b.length)[0];
console.log('Part 1: %i', bestRoute.length);


function posEqual(pos1, pos2) {

  return pos1[0]===pos2[0] && pos1[1]===pos2[1];

}
*/

/**
 * Returns an array of preferred moves.
 */
/*
function getMoveOrder(pos) {

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

    if (alreadyVisited.has([x,y].join(','))) {
      // already visited
      return false;
    }

    if (!legalMove(pos, [x,y])) {
      return false;
    }

    return true;

  }).sort((posA, posB) => {

    return closeScore(posA)-closeScore(posB);

  });

}*/


/**
 * Returns a lower number if we're closer to the destination
 */
/*
function closeScore(pos) {

  return Math.abs(pos[0]-endPos[0]) * Math.abs(pos[1]-endPos[1]);

}

function legalMove(fromPos, toPos) {

  const fromElev = grid.at(...fromPos).charCodeAt();
  const toElev = grid.at(...toPos).charCodeAt();

  // console.log(fromElev, toElev, (toElev-fromElev)<=1);

  return (toElev-fromElev)<=1;

}*/
