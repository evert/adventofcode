import { readInput } from '../../helpers.js';

const input = readInput()
  .split('\n')
  .map(line => line.match(/^([A-Za-z]+)\s.*\s([0-9]+)\s.*\s([0-9]+)\s.*\s([0-9]+)\s/))
  .map(line => [line[1], +line[2], +line[3], +line[4]]);

let bestDistance = 0;
const maxTime = 2503;

function calcDistance(speed, time, pause, totalTime) {

  let parts = Math.floor(totalTime / (time + pause));
  let distance = parts * time * speed;

  let remainder = totalTime % (time + pause);
  if (remainder > time) {
    distance+=speed * time;
  } else {
    distance+=speed * remainder;
  }
  return distance;

}


for(const [reindeer, speed, time, pause] of input) {

  const distance = calcDistance(speed, time, pause, maxTime);
  if (distance > bestDistance) bestDistance = distance;

}

const points = input.reduce((acc, cur) => ({...acc, [cur[0]]: 0}), {}); 

for(let i=1; i<=maxTime; i++) {

  let bestSecond = 0;
  let bestRd;

  for(const [reindeer, speed, time, pause] of input) {

    const distance = calcDistance(speed, time, pause, i);
    if (distance > bestSecond) {
      bestSecond = distance;
      bestRd = reindeer;
    }

  }
  points[bestRd]++;

}

console.log(points);
console.log('Part 1: %i', bestDistance);
console.log('Part 2: %i', Math.max(...(Object.values(points))));
