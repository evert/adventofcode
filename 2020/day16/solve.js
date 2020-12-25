const { readFileSync } = require('fs');
const [rulesStr, myTicketStr, nearbyTicketsStr] = readFileSync('./input', 'utf-8').trim().split('\n\n');


const validRuleRanges = getValidRuleRanges(rulesStr);

const nearbyTickets = nearbyTicketsStr
  .split('\n')
  .slice(1)
  .map( ticketStr => ticketStr.split(',').map( n => +n));


let part1Result = 0;

const validTickets = [];

for(const nearbyTicket of nearbyTickets) {

  let hasInvalidNum = false;

  for(const num of nearbyTicket) {
    let valid = false;
    for(const rule of validRuleRanges) {
      if (num >= rule.range1[0] && num <= rule.range1[1]) {
        valid = true;
        break;
      }
      if (num >= rule.range2[0] && num <= rule.range2[1]) {
        valid = true;
        break;
      }
    }
    if (!valid) {
      hasInvalidNum = true;
      part1Result += num;
    }

  }

  if (!hasInvalidNum) {
    validTickets.push(nearbyTicket);
  }

}

console.log('Part 1', part1Result);
console.log('Valid tickets', validTickets.length);

for(const rule of validRuleRanges) {

  // Get a list from 0 to 19
  const possibleIndexes = new Set(validTickets[0].keys()); 

  for(const ticket of validTickets) {

    for(const index of possibleIndexes.values()) {

      const checkNum = ticket[index];
      if ((checkNum >= rule.range1[0] && checkNum <= rule.range1[1]) || (checkNum >= rule.range2[0] && checkNum <= rule.range2[1])) {
        continue;
      } else {
        possibleIndexes.delete(index);
      }

    }

  }
  rule.possibleIndexes = possibleIndexes;

}

const foundIndexes = new Set();

while(foundIndexes.size < validRuleRanges.length) {

  for(const rule of validRuleRanges) {

    if (rule.index !== -1) {
      // already found
      continue;
    }
    if (rule.possibleIndexes.size === 1) {
      rule.index = Array.from(rule.possibleIndexes)[0];
      foundIndexes.add(rule.index);
      console.log('Rule "%s" has index %i', rule.name, rule.index);
    }
    for(const foundIndex of foundIndexes) {
      rule.possibleIndexes.delete(foundIndex);
    }

  }

}

const myTicket = myTicketStr
  .split('\n')[1]
  .split(',')
  .map( (num, idx) => {

    for(const rule of validRuleRanges) {
      if (rule.index === idx) {
        return [rule.name, +num];
      }
    }

  });

console.log(Object.fromEntries(myTicket));


console.log('Part 2', myTicket.reduce( (acc, cur) => {

  if (cur[0].startsWith('departure')) {
    return acc * cur[1];
  } else {
    return acc;
  }

},1));



function getValidRuleRanges(input) {

  const result = [];

  for(const rule of input.split('\n')) {
    const matches = rule.match(/^([\sa-z]+): ([0-9]+)-([0-9]+) or ([0-9]+)-([0-9]+)$/);
    result.push({
      name: matches[1],
      range1: [+matches[2], +matches[3]],
      range2: [+matches[4], +matches[5]],
      possibleIndexes: [],
      index: -1,
    });

  }

  return result;

}
