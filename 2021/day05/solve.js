const fs = require('fs');

const data = fs
  .readFileSync('./input', 'utf-8')
  .trim()
  .split('\n')
  .map(row => {
    return row.split(' -> ').map(coord => coord.split(',').map(coord => +coord))
  });

let part1Result = 0;

const coords={};

for(const [[x1, y1], [x2, y2]] of data) {

  if (x1 !== x2 && y1 !== y2) {
    continue;
  } 

  const xSort = [x1, x2].sort((a,b) => a-b);
  const ySort = [y1, y2].sort((a,b) => a-b); 

  for(let x = xSort[0]; x <= xSort[1] ; x++) {
    for(let y = ySort[0]; y <= ySort[1]; y++) {

      const value = coords[`${x},${y}`] ?? 0;
      coords[`${x},${y}`] = value+1;

      if (value===1) {
        part1Result++;
      }

    }
  }

}

console.log('Part 1: %d', part1Result);

let part2Result = part1Result; 

for(const [[x1, y1], [x2, y2]] of data) {

  if (x1 === x2 || y1 === y2) {
    continue;
  } 

  const xD = x1 < x2 ? 1 : -1;
  const yD = y1 < y2 ? 1 : -1;

  for(
    let index = 0;
    index < Math.abs(x2-x1)+1;
    index++
  ) {

    const x = x1 + (index * xD);
    const y = y1 + (index * yD);

    const value = coords[`${x},${y}`] ?? 0;
    coords[`${x},${y}`] = value+1;

    if (value===1) {
      part2Result++;
    }

  }

}

console.log('Part 2: %d', part2Result);
