import { readFileSync } from 'fs';

type Command = ['N' | 'E' | 'S' | 'W' | 'L' | 'R' | 'F', number];

const commands: Command[] = readFileSync('./input', 'utf-8')
  .trimEnd()
  .split('\n')
  .map( str => {
    const [, c, n] = str.match(/^([A-Z])([0-9]+)$/) as any;
    return [c,parseInt(n,10)];
  });


console.log('Part 1: %i', solve1(commands));
console.log('Part 2: %i', solve2(commands));

function solve1(commands: Command[]) {

  let direction = 1;
  let x = 0;
  let y = 0;

  for(const [c, n] of commands) {

    switch(c) {

      case 'N' :
        y-=n;
        break;
      case 'E' :
        x+=n;
        break;
      case 'S' :
        y+=n;
        break;
      case 'W' :
        x-=n;
        break;

      case 'L' :
        direction = (direction - n/90);
        if (direction < 0) direction = 4+direction;
        break;
      case 'R' :
        direction = (direction + n/90) % 4;
        break;

      case 'F' :
        switch(direction) {
          case 0 :
            y-=n;
            break;
          case 1:
            x+=n;
            break;
          case 2:
            y+=n;
            break;
          case 3:
            x-=n;
            break;
        }
        break;

    }

  }

  return Math.abs(x)+Math.abs(y);

}
function solve2(commands: Command[]) {

  let x = 0;
  let y = 0;
  let wX = 10;
  let wY = -1;

  for(const [c, n] of commands) {

    switch(c) {

      case 'N' :
        wY-=n;
        break;
      case 'E' :
        wX+=n;
        break;
      case 'S' :
        wY+=n;
        break;
      case 'W' :
        wX-=n;
        break;

      case 'L' :
        for(let r = 0; r < n/90; r++) {
          [wX, wY] = [wY, -wX];
        }
        break;
      case 'R' :
        for(let r = 0; r < n/90; r++) {
          [wX, wY] = [-wY, wX];
        }
        break;

      case 'F' :
        x += wX * n;
        y += wY * n;
        break;

    }

  }

  return Math.abs(x)+Math.abs(y);

}

