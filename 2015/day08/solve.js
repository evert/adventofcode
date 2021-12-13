import { readInput } from '../../helpers.js';

const input = readInput().split('\n');

let inputSize = 0;
let decodedSize = 0;
let encodedSize = 0;

for(const line of input) {

  inputSize += line.length;

  const decoded = decodePart1(line); 
  decodedSize += decoded.length;

  const encoded = encodePart2(line);
  encodedSize += encoded.length;


}

console.log('Part 1: %d', inputSize-decodedSize);
console.log('Part 2: %d', encodedSize-inputSize);

function decodePart1(input) {

  return input 
      .slice(1,-1)
      .replace(/(\\\\|\\"|\\x[0-9A-Fa-f]{2})/g, (str) => {
        switch(str.slice(1,2)) {
          case '"' :
            return '"';
          case '\\' :
            return '\\'; 
          case 'x' :
            return String.fromCharCode(parseInt(str.slice(2), 16));
          default:
            throw new Error(`Unknown escape thingy: ${str}`);
        }
      });
}

function encodePart2(input) {

  return '"' + input.replace(/\"|\\/g, str => {

    if (str==='"') {
      return '\\"';
    } else {
      return '\\\\';
    }

  }) + '"';
  return input;

}
