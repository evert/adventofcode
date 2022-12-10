import { readInput } from '../../helpers.js';

const answer = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

const input = readInput()
  .split('\n')
  .map(line => {

    const match = line.match(/^Sue ([0-9]+): (.*)$/);
   
    const properties = Object.fromEntries(
      match[2]
        .split(',')
        .map( propLine => {
          const m = propLine.match(/^\s?([a-z]+): ([0-9]+)\s?$/);
          return [m[1], +m[2]];
        })
    );

    return {
      id: +match[1],
      ...properties
    };

  });


const winner1 = input.find( sue => {
  for(const [prop,val] of Object.entries(answer)) {
    if (!(prop in sue)) {
      continue;
    }
    if (sue[prop] !== answer[prop]) {
      return false;
    }
  }
  return true;
});

console.log('Part 1: %i', winner1.id);

const winner2 = input.find( sue => {
  for(const [prop,val] of Object.entries(answer)) {
    if (!(prop in sue)) {
      continue;
    }
    switch(prop) {
      case 'cats':
      case 'trees':
        if (sue[prop] <= answer[prop]) {
          return false;
        }
        break;
      case 'pomeranians' :
      case 'goldfish' :
        if (sue[prop] >= answer[prop]) {
          return false;
        }
        break;
      default :
        if (sue[prop] !== answer[prop]) {
          return false;
        }
        break;
    }

  }
  return true;
});

console.log('Part 1: %i', winner2.id);
