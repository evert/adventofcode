import { readInput, permutations } from '../../helpers.js';

const input = readInput()
  .split('\n')
  .map(line => {
    return line.match(/^([A-zaz]+)\s.*(lose|gain)\s([0-9]+)\s.*\s([A-Za-z]+)\.$/).slice(1);
  })
  .map(line => [line[0], +line[2] * (line[1]==='gain' ? 1 : -1), line[3]]);

const scores = input.reduce((acc, cur) => ({...acc, [cur[0] + '-' + cur[2]]: cur[1] }), {});
const guests = new Set(input.map(line => line[0]));

function guestBestList() {
  let bestScore = 0;

  for(const guestList of permutations(guests)) {

    const score = calculateScore(guestList);
    if (score > bestScore) {
      bestScore = score;
    }

  }
  return bestScore;
}

console.log('Part 1: %i', guestBestList());
guests.add('Evert');
console.log('Part 2: %i', guestBestList());

function calculateScore(guestList) {

  let score = 0;
  for(let i=0; i<guestList.length-1; i++) {
    score+=scorePair(guestList[i], guestList[i+1]);
  }

  return score+scorePair(guestList[0], guestList.at(-1));

}

function scorePair(guest1, guest2) {

  const score = scores[`${guest1}-${guest2}`] + scores[`${guest2}-${guest1}`];
  return (Number.isNaN(score)) ? 0 : score; 

}
