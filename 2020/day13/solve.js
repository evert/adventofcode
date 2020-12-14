const fs = require('fs');

const [offset, busIdStr] = fs.readFileSync('./input','utf8').split('\n');

const inputs = busIdStr.split(',').map( s => s==='x' ? null : parseInt(s,10));

let lowest = Infinity;
let lowestBusId;

for(const check of inputs) {

  if (check===null) continue;

  // How many minutes ago since last bus?
  const lastBusTime = offset - (offset % check);
  const nextBusTime = lastBusTime + check;
  
  if (nextBusTime < lowest) {
    lowest = nextBusTime;
    lowestBusId = check;
  }

  console.log(check, nextBusTime, nextBusTime - offset);

}

console.log('Part 1', (lowest - offset) * lowestBusId);

let highestBusId = 0;
let highestBusIdIdx;

for(const [idx, busId] of inputs.entries()) {
  if (busId !== null && busId > highestBusId) {
    highestBusId = busId;
    highestBusIdIdx = idx;
  }
}

// Lets get a new version of the previous array, removing the `null` and instead storing their indexes.

const busIds = inputs.map(
  (busId, index) => busId === null ? null : [busId, index]
).filter(busId => busId !== null);

// How quickly we are increasing the timestamp. This is effectively the known
// period in the pattern.
let step = busIds[0][0];

// Timestamp
let ts = 0;

// How many have we found?
let found = 1;

console.log(busIds);

let iterations = 0;

while(true) {

  iterations++;

  ts+=step;
  const [checkBusId, checkOffset] = busIds[found]; 
  if ((ts+checkOffset) % checkBusId === 0) {
    step *= checkBusId;
    found++;
    console.log('Found period %i. Number of buses: %i. Timestamp: %i', step, found, ts);
    if (found === busIds.length) break;
  }

}

console.log('Solved part 2 in %i iterations. Answer: %i', iterations, ts);
