import { readInput } from '../../helpers.js';

const input = readInput().split('\n');

const tree = {};
let currentStack = [tree];

for(const line of input) {

  console.log(line);

  if (line.startsWith('$ cd')) {

    const newDir = line.substr(5);
    if (newDir==='/') {
      currentStack = [tree];
    } else if (newDir === '..') {
      currentStack.pop();
    } else if (newDir in currentStack.at(-1)) {
      currentStack.push(currentStack.at(-1)[newDir]);
    } else {
      throw new Error(`Directory ${newDir} not found in current directory`);
    }

  } else if (line.startsWith('$ ls')) {
    // Ignore
  } else if (line.startsWith('dir ')) {
    currentStack.at(-1)[line.substr(4)] = [];
  } else if (line.match(/^[0-9]+ [a-z\.]+$/)) {
    const [size, name] = line.split(' ');
    currentStack.at(-1)[name] = +size;
  } else {
    throw new Error('Unknown line format: ' + line);
  }

}

function dumpTree(tree, space = '') {

  for(const [key, val] of Object.entries(tree)) {
    if (Array.isArray(val)) {
      console.log(`${space} ${key} (dir)`);
      dumpTree(val, '  ');
    } else {
      console.log(`${space} ${key} (file, size=${val})`);
    }
  }

}


function dirSize(tree) {

  let size = 0;
  for(const [key, val] of Object.entries(tree)) {
    if (Array.isArray(val)) {
      size += dirSize(val);
    } else {
      size += val;
    }
  }
  return size;

}

function getSmallDirs(tree, maxSize = 100000) {

  let result = [];
  const size = dirSize(tree);
  // First count the current directory
  if (size <= maxSize) {
    result.push(size);
  }

  // Now add the result for any subdirs (yes this is not super efficient)
  for(const [key, val] of Object.entries(tree)) {
    if (Array.isArray(val)) {
      result.push(...getSmallDirs(val, maxSize));
    }
  }

  return result;

}

console.log('Part 1: %i', getSmallDirs(tree).reduce((cur, acc) => cur+acc));

const totalSpace = 70000000;
const spaceRequired = 30000000;
const totalUsed = dirSize(tree);
const totalFree = totalSpace-totalUsed;
const minDelete = spaceRequired - totalFree;

console.log('Total space: %i', totalSpace);
console.log('Total used:  %i', totalUsed);
console.log('Total free:  %i', totalFree);
console.log('We need %i to install', spaceRequired);
console.log('We need to delete an additional %i to have enough space', minDelete);

const bestCandidate = getSmallDirs(tree, spaceRequired)
  .filter(dirSize => dirSize > minDelete)
  .sort((a, b) => a-b)
  .at(0);

console.log('Part 2: %i', bestCandidate);
