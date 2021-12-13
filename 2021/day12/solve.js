import { readInput } from '../../helpers.js';

/**
 * @type Map<string, string[]>
 */
const caveConnections = new Map();

for(const line of readInput().split('\n')) {
 
  const [from, to] = line.split('-');
  if (caveConnections.has(from)) {
    caveConnections.get(from).push(to);
  } else {
    caveConnections.set(from, [to]);
  }
  if (caveConnections.has(to)) {
    caveConnections.get(to).push(from);
  } else {
    caveConnections.set(to, [from]);
  }

}

console.log('Part 1: %d', findPaths(['start'], ['start'], 0).length);
console.log('Part 2: %d', findPaths(['start'], ['start'], 1).length);

function findPaths(route, visited, smallCaveQuota) {

  const result = [];

  for(const connection of caveConnections.get(route[route.length-1])||[]) {

    let newSmallCaveQuota = smallCaveQuota;
    if (visited.includes(connection)) {
      if (smallCaveQuota===1 && connection!=='start' && connection!=='end') {
        newSmallCaveQuota = 0;
      } else {
        // already visited, skip this.
        continue;
      }
    } 

    if (connection==='end') {
      result.push([...route, connection]);
    }

    const newVisited = [...visited];
    if (connection.toLowerCase() === connection) {
      newVisited.push(connection);
    }
    result.push(
      ...findPaths(
        [...route, connection],
        newVisited,
        newSmallCaveQuota
      )
    );

  }
  return result;

}
