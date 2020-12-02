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

  const [, p1, p2, char, password] = matches;
  
  const p1i = parseInt(p1, 10)-1;
  const p2i = parseInt(p2, 10)-1;

  if ((password[p1i]===char) != (password[p2i]===char)) {
    successCount++;
  }

}

console.log('successCount', successCount);
