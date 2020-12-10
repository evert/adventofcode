const fs = require('fs');

const groups = fs.readFileSync('./input', 'utf-8')
  .trimEnd()
  .split('\n\n')
  .map( groupStr => groupStr.split('\n'));


let total1 = 0;
let total2 = 0;

for(const group of groups) {

  const set = new Set(
    [].concat(
      ...group.map(
        line => line.split('')
      )
    )
  );
  total1+=set.size;

  const counts = {};
  for(const line of group) {

    for(const answer of line.split('')) {
      counts[answer] = counts[answer] ? counts[answer]+1 : 1;
    }

  }

  for(const count of Object.values(counts)) {
    if (count === group.length) {
      total2++;
    }
  }

  console.log(group);
  console.log(counts);
  console.log(total2, group.length);

}

console.log('Part 1', total1);
console.log('Part 2', total2);
