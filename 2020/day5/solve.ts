import { readFileSync } from 'fs';

const lines = readFileSync('./input', 'utf-8').split('\n');
// Last line is empty
lines.pop();

let max = -Infinity;

const foundPasses = new Set<number>();

for(const boardingpass of lines) {

  const [,, seatId] = getRowCol(boardingpass);
  if (seatId > max) {
    max = seatId;
  }
  foundPasses.add(seatId);

}

console.log('Part 1', max);

for(let ii = 1; ii<max; ii++) {
  if (!foundPasses.has(ii) && foundPasses.has(ii+1) && foundPasses.has(ii-1)) {
    console.log('Part 2: ', ii);
  } 
}


/**
 * There has to be a much better way to do this...
 */
function getRowCol(input: string): [number, number, number] {

  const row = charToNum(input.substr(0,7), 'F', 'B');
  const col = charToNum(input.substr(7), 'L', 'R');

  return [row, col, (row*8)+col];

}

function charToNum(input: string, zeroChar: string, oneChar: string) {
  const row = parseInt(
    input
      .replace(new RegExp(zeroChar, 'g'), '0')
      .replace(new RegExp(oneChar, 'g'), '1'),
    2
  )
  return row;

}


