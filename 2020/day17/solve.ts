import Grid3 from './grid3';
import Grid4 from './grid4';

const sampleInput = `
.#.
..#
###
`;

const input = `
#.#.#.##
.####..#
#####.#.
#####..#
#....###
###...##
...#.#.#
#.##..##`;


function runSimulation(input: string, iterations: number, dimensions: number) {

  let grid;
  if (dimensions === 3) {
    grid = new Grid3(input);
  } else {
    grid = new Grid4(input);
  }
  console.log('Start');
  grid.render();
  console.log('');

  for(let ii = 0; ii < iterations; ii++) {

    grid = grid.next();
    console.log('Iteration %i', ii);
    grid.render();
    console.log('');

  }

  return grid.countActive();

}

console.log('Sample Input', runSimulation(sampleInput, 3, 3));

console.log('Part 1', runSimulation(input, 6, 3));
console.log('Part 2', runSimulation(input, 6, 4));

