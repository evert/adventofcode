import { readInput } from '../../helpers.js';

const input = readInput()
  .split('\n')
  .map(line => {
    const matches = line.match(/^([A-Za-z]+) to ([A-Za-z]+) = ([0-9]+)$/);
    return [matches[1], matches[2], +matches[3]];
  }).reduce((acc, cur) => {
    if (!acc[cur[0]]) acc[cur[0]] = {};
    if (!acc[cur[1]]) acc[cur[1]] = {};

    acc[cur[0]][cur[1]] = cur[2];
    acc[cur[1]][cur[0]] = cur[2];
    return acc;
  }, {});



const routes = getRoutes(new Set(Object.keys(input)));

let bestRoute = Infinity;
let worstRoute = 0;

for(const route of routes) {
  const score = routeScore(route);
  if (score<bestRoute) bestRoute = score;
  if (score>worstRoute) worstRoute = score;
}


console.log('Part 1: %i', bestRoute);
console.log('Part 2: %i', worstRoute);

function getRoutes(allCities,soFarRoute = []) {

  const routes = [];
  for(const city of allCities) {

    const newA = new Set(allCities);
    newA.delete(city);

    if (newA.size === 1) {
      routes.push([...soFarRoute, city, Array.from(newA.values())[0]]);
    } else {
      routes.push(...getRoutes(newA, [...soFarRoute, city]));
    }

  }

  return routes;

}

function routeScore(route) {

  let score = 0;
  for(let i=0; i < route.length-1; i++) {
    score += input[route[i]][route[i+1]];
  }

  return score;

}
