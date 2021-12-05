const fs = require('fs');

const data = fs.readFileSync('./input', 'utf-8');

const balls = data
  .substr(0, data.indexOf('\n'))
  .split(',')
  .map(item => parseInt(item,10));


const grids = data
  .substr(data.indexOf('\n')+1)
  .split('\n\n')
  .map(grid =>
    grid
      .trim()
      .split('\n')
      .map(row =>
        row
          .trim()
          .split(/\W+/)
          .map(n => parseInt(n, 10))
      )
  );


function calculateScore(grid) {

  let totalScore = grid.reduce((acc, cur) => {
    return acc + cur.reduce((acc, cur) => acc+cur, 0)
  }, 0);

  const rowFound = [0, 0, 0, 0, 0];
  const colFound = [0, 0, 0, 0, 0];

  for(const [ballNum, ball] of balls.entries()) {

    for(const [y, row] of grid.entries()) {
      
      for(const [x, cell] of row.entries()) {

        if (cell === ball) {
          totalScore-=ball;
          rowFound[y]++;
          colFound[x]++;

          if (rowFound[y]===5 || colFound[x]===5) {
            return [ballNum, ball, totalScore * ball];
          }
        }
      }
    }

  }

}

let leastTurns = Infinity;
let part1Score = 0;
let mostTurns = 0;
let part2Score = 0; 

for(const grid of grids) {

  const [ballIndex, ball, score] = calculateScore(grid);

  if (ballIndex < leastTurns) {
    leastTurns = ballIndex;
    part1Score = score;
  }
  if (ballIndex >= mostTurns) {
    mostTurns = ballIndex;
    part2Score = score;
  }

}

console.log('Part 1: %d', part1Score);
console.log('Part 2: %d', part2Score);
