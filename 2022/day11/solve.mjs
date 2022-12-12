import { readInput } from '../../helpers.js';

const input = readInput().split('\n\n');

let monkeys = [];

for(const block of input) {

  const lines = block.split('\n');

  monkeys.push({
    id: +block.match(/Monkey ([0-9]+):/)[1],
    items: lines[1].match(/([0-9])(\w|$)/g).map(i => +i),
    op: lines[2].match(/Operation: new = old ([+*]) (old|new|[0-9]+)$/).slice(1,3),
    test: +lines[3].match(/by ([0-9]+)$/)[1],
    t: +lines[4].match(/monkey ([0-9]+)$/)[1],
    f: +lines[5].match(/monkey ([0-9]+)$/)[1],
    counter: 0,
  });

}

const originalMonkeys = JSON.parse(JSON.stringify(monkeys));

function printMonkeys() {
  for(const monkey of monkeys) {
    console.log('Monkey %i: %s', monkey.id, monkey.items.join(', '));
  }
}

printMonkeys();

function round1() {

  for(const monkey of monkeys) {

    const items = monkey.items;
    monkey.items = [];
    for(const item of items) {

      monkey.counter++;
      let newItemScore;
      let operand = monkey.op[1] === 'old' ? item : +monkey.op[1];
      if (monkey.op[0]==='*') {
        newItemScore = item * operand;
      } else {
        newItemScore = item + operand;
      }

      newItemScore = Math.floor(newItemScore/3);

      if (newItemScore % monkey.test === 0) {
        monkeys[monkey.t].items.push(newItemScore);
      } else {
        monkeys[monkey.f].items.push(newItemScore);
      }

    }

  }

}
for(let i=0;i<20;i++) {
  round1();
}

const newMonkeys = [...monkeys].sort((a, b) => b.counter - a.counter);

console.log('Part 1: %i', newMonkeys[0].counter * newMonkeys[1].counter);

/**
 * Lowest common denominator of all divisors.
 *
 * We use this to reduce the 'worry level'.
 *
 * I looked up the answer to this, this is not my own invention =(
 */
const lcd = monkeys.reduce((acc, cur) => acc * cur.test,1);

monkeys = originalMonkeys;

function round2() {

  for(const monkey of monkeys) {

    const items = monkey.items;
    monkey.items = [];
    for(const item of items) {

      monkey.counter++;
      let newItemScore;
      let operand = monkey.op[1] === 'old' ? item : +monkey.op[1];
      if (monkey.op[0]==='*') {
        newItemScore = item * operand;
      } else {
        newItemScore = item + operand;
      }
      newItemScore = newItemScore % lcd;
      const targetMonkey = (newItemScore % monkey.test === 0)?monkeys[monkey.t]:monkeys[monkey.f]; 
      targetMonkey.items.push(newItemScore);

    }

  }

}
for(let i=0;i<10000;i++) {
  round2();
}
// printMonkeys();

const newMonkeys2 = [...monkeys].sort((a, b) => b.counter - a.counter);

console.log('Part 2: %i', newMonkeys2[0].counter * newMonkeys2[1].counter);



