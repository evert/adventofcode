import { readNumberGrid } from '../../helpers.js';

const input = readNumberGrid();

let invisibleTrees = 0;
let bestScore = 0;

function getColumn(x) {
  return input.map( col => col[x] );
}

for(let y=1; y < input.length -1; y++) {

  const row = input[y];

  for(let x=1; x < input[y].length -1; x++) {

    const column = getColumn(x);
    const cell = input[y][x];

    const treeLines = [
      row.slice(0,x).reverse(),
      row.slice(x+1),
      column.slice(0,y).reverse(),
      column.slice(y+1)
    ];

    const score = treeLinesScore(cell, treeLines);
    if (score > bestScore) {
      bestScore = score;
    }

    if (!treeLines.some(treeLine => Math.max(...treeLine)<cell)) {
      invisibleTrees++;
    }
  }
}

const height = input.length;
const width = input[0].length;

const visibleTrees = (height*width) - invisibleTrees;

console.log('Part 1: %i', visibleTrees);
console.log('Part 2: %i', bestScore);

function treeLinesScore(cell, treeLines) {

  return treeLines.reduce(
    (acc, cur) => acc*treeLineScore(cell, cur),
    1
  );


}
function treeLineScore(cell, treeLine) {

  for(let i=0; i<treeLine.length; i++) {

    if(treeLine[i] >= cell) {
      return i+1;
    }

  }
  return treeLine.length;

}
