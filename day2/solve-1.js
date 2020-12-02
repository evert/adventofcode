const fs = require('fs');
const input = fs.readFileSync('input', 'utf-8');

const regex = /^([0-9]+)-([0-9]+) ([a-z]): ([a-z]+)$/

let successCount = 0;

for(const row of input.split('\n')) {

  if (!row) {
    // Skip empty line
    continue;
  }
  const matches = row.match(regex);
  if (!matches) {
    console.log('No match! %s', row);
  }

  const [, min, max, char, password] = matches;
  
  const minI = parseInt(min, 10);
  const maxI = parseInt(max, 10);

  const occurences = Array.from(password.matchAll(char)).length;
  if (occurences < minI || occurences > maxI) {
    continue;
  }
  successCount++;

}

console.log('successCount', successCount);
