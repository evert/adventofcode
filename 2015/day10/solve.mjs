const input = '1113122113';

console.log('Part 1: %i', doThing(40));
console.log('Part 2: %i', doThing(50));


function doThing(iterations) {

  let output = input;

  for(let i=0; i<iterations; i++) {

    output = process(output);

  }
  return output.length;

}

function process(input) {

  let output = '';

  let lastChar = '';
  let count = '';

  for(const char of input.split('')) {

    if (char!==lastChar) {
      output += count + lastChar;
      lastChar = char;
      count = 1;
    } else {
      count++;
    }

  }

  return output + count + lastChar;

}
