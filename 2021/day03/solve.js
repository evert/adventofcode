const fs = require('fs');

const input = fs.readFileSync('./input', 'utf-8')
  .trim()
  .split('\n');

function mostCommonBitInOffset(rows, offset) {

  let result = [0, 0];

  for(const row of rows) {
    if (row[offset]==='0') {
      result[0]++;
    } else {
      result[1]++;
    }
  }

  if (result[0] > result[1]) {
    return '0';
  } else {

    // IF both values are equal, we'll always return 1.
    // This is what part 2 demands.
    return '1';
  }

}

let gamma = '';
let epsilon = '';


for(let offset=0; offset < input[0].length; offset++) {

  const mostCommon = mostCommonBitInOffset(input, offset);
  gamma += mostCommon;
  epsilon += mostCommon==='1' ? '0' : '1';

}

console.log(
  'Part 1: %d',
  parseInt(gamma, 2)*parseInt(epsilon, 2)
);


let oxygenRows = input;
let oxyIndex = 0;
while(oxygenRows.length > 1) {

  const mostCommon = mostCommonBitInOffset(oxygenRows, oxyIndex);
  oxygenRows = oxygenRows.filter(row => row[oxyIndex]===mostCommon);
  oxyIndex++;

}

const oxygen = parseInt(oxygenRows[0], 2);

let co2Rows = input;
let co2Index = 0;
while(co2Rows.length > 1) {

  const mostCommon = mostCommonBitInOffset(co2Rows, co2Index);
  co2Rows = co2Rows.filter(row => row[co2Index]!==mostCommon);
  co2Index++;
  if (co2Index>input[0].length) process.exit();

}

const co2 = parseInt(co2Rows[0], 2);

console.log('Part 2: %d', co2*oxygen);
