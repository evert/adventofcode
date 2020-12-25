import { readFileSync } from 'fs';

type MemCommand = ['mem', bigint, bigint];
type MaskCommand = ['mask', bigint, bigint];
type Command = MemCommand | MaskCommand;


function parse(lines: string[]): Command[] {

  const result: Command[] = [];

  for(const line of lines) {

    const m1 = line.match(/^mask = ([01X]+)$/);
    if (m1) {
      // We turn the mask into a negative and positive mask.

      // In the positive mask, everthing that's a X becomes 0.
      const positive = BigInt(parseInt(m1[1].replace(/X/g,'0'),2));

      // In the negative mask we turn all the X into 1.
      const negative = BigInt(parseInt(m1[1].replace(/X/g, '1'),2));

      result.push(['mask', positive, negative]);
      continue;
    } 
    const m2 = line.match(/^mem\[([0-9]+)\] = ([0-9]+)$/);
    if (m2) {
      result.push(['mem', BigInt(parseInt(m2[1],10)), BigInt(parseInt(m2[2],10))]);
      continue;
    }

    throw new Error('Unknown line format: ' + line);
       

  }

  return result;

}

function runPart1(lines: string[]): bigint[] {

  const commands = parse(lines);
  const memory: bigint[] = [];
  let masks: [bigint, bigint] = [0n, 0n];

  const mem = (location: bigint, value: bigint) => {
    const loc = parseInt(location.toString());
    memory[loc] = 0n;
    memory[loc] = (value | masks[0]) & masks[1];
  };

  for(const command of commands) {
    switch(command[0]) {
       case 'mem': mem(command[1], command[2]); break;
       case 'mask':
        masks = [command[1], command[2]];
    }
  }
  return memory;

}
function runPart2(lines: string[]): bigint[] {

  const commands = parse(lines);
  const memory: bigint[] = [];
  let masks: [bigint, bigint] = [0n, 0n];

  const mem = (location: bigint, value: bigint) => {

    const calcLoc = location | masks[1];

   const loc = parseInt(calcLoc.toString());
    memory[loc] = 0n;
    memory[loc] = value;
  };

  for(const command of commands) {
    switch(command[0]) {
       case 'mem': mem(command[1], command[2]); break;
       case 'mask':
        masks = [command[1], command[2]];
    }
  }
  return memory;

}


const lines = [
  'mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X',
  'mem[8] = 11',
  'mem[7] = 101',
  'mem[8] = 0'
];
const test1 = runPart1(lines);
const result1 = runPart1(
  readFileSync('./input', 'utf8').trim().split('\n')
);
const test2 = runPart2(lines);
const result2 = runPart2(
  readFileSync('./input', 'utf8').trim().split('\n')
);

console.log('Test Result', test1.reduce( (acc, curr) => acc+curr));
console.log('Part 1', result1.reduce( (acc, curr) => curr ? acc+curr : acc));

console.log('Test Result', test2.reduce( (acc, curr) => acc+curr));
console.log('Part 2', result2.reduce( (acc, curr) => curr ? acc+curr : acc));
