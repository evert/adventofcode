import { readInput } from '../../helpers.js';

const input = readInput()
  .split('\n')
  .map(line => {
    const f = line.split(' ');
    return [f[0], +f[1]];
  });

let hX = 0;
let hY = 0;

let tX = 0;
let tY = 0;

const result = new Set();

for(const [dir, distance] of input) {

  for(let i=0;i < distance;i++) {

    switch(dir) {
      case 'U' : hY++; break;
      case 'D' : hY--; break;
      case 'L' : hX--; break;
      case 'R' : hX++; break;
      default : throw new Error('bla');
    }

    if(Math.abs(hX-tX)>1 || Math.abs(hY-tY)>1) {
      if (hX!==tX) {
        tX += (hX-tX) > 0 ? 1 : -1;
      }
      if (hY!==tY) {
        tY += (hY-tY) > 0 ? 1 : -1;
      }
    }
    result.add(tX + '-' + tY);
  }

}


console.log('Part 1: %i', result.size);

const result2 = new Set();

const knots = [];
for(let i=0;i<10;i++) {
  knots.push([0,0]);
}


for(const [dir, distance] of input) {

  for(let i=0;i < distance;i++) {

    switch(dir) {
      case 'U' : knots[0][0]++; break;
      case 'D' : knots[0][0]--; break;
      case 'L' : knots[0][1]--; break;
      case 'R' : knots[0][1]++; break;
      default : throw new Error('bla');
    }

    for(let i=1; i < knots.length; i++) {

      const knot1 = knots[i-1];
      const knot2 = knots[i];

      if(Math.abs(knot1[0]-knot2[0])>1 || Math.abs(knot1[1]-knot2[1])>1) {
        if (knot1[1]!==knot2[1]) {
          knot2[1] += (knot1[1]-knot2[1]) > 0 ? 1 : -1;
        }
        if (knot1[0]!==knot2[0]) {
          knot2[0] += (knot1[0]-knot2[0]) > 0 ? 1 : -1;
        }
      }
    }
    result2.add(knots[9].join('-'));
  }

}


console.log('Part 2: %i', result2.size);
