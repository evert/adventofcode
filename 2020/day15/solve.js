const input = [6,19,0,5,7,13,1];

function solve(inp, max) {

  const lastIndex = new Map();

  let previousNumber = -1;
  let newNumber = -1;

  for(let ii=1; ii <= max; ii++) {

    previousNumber = newNumber;

    if (ii < inp.length+1) {
      newNumber = inp[ii-1];
    } else {
      let previousIndex = lastIndex.get(previousNumber);
      if (!previousIndex) {
        newNumber = 0;
      } else {
        newNumber = ii-previousIndex-1;
      }
    }

    if (previousNumber!==-1)
    lastIndex.set(previousNumber, ii-1);

  }

  return newNumber;


}

function log(index, number) {

  // console.log(index, number);

}


console.log('Test input', solve([0,3,6], 10));
console.log('Part 1', solve(input, 2020));
console.log('Part 2', solve(input, 30000000));
