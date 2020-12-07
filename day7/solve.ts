import { readFileSync } from 'fs';

type RuleMap = Record<string, Record<string, number>>;

const rules: RuleMap = parseRules();

function findParents(bagType:string): string[] {

  const result = new Set<string>();

  for(const [ruleBagType, children] of Object.entries(rules)) {
    if (children[bagType] !== undefined) {
      result.add(ruleBagType);
      for(const foo of findParents(ruleBagType)) {
        result.add(foo);
      }
    }
  }

  return Array.from(result);

}

function countChildren(bagType: string): number {

  let count = 0;
  for(const [bagChildType, num] of Object.entries(rules[bagType])) {
    count += num;
    count += num * countChildren(bagChildType);
  }
  return count;

}


console.log('Part 1', findParents('shiny gold').length);
console.log('Part 2', countChildren('shiny gold'));


function parseRules(): RuleMap {
  const lines = readFileSync('./input', 'utf-8').trimEnd().split('\n');

  return Object.fromEntries(lines.map(line => {
    const [, bagType, childrenStr] = line.match(/^(.*) bags contain (.*)$/)!;

    const children: Record<string, number> = {};

    if (childrenStr !== 'no other bags.') {
      for(const childStr of childrenStr.split(',')) {
        const [, num, bagType] = childStr.trim().match(/^([0-9])+ (.*) bags?.?$/)!;
        children[bagType] = parseInt(num, 10);
      };
    }

    return [
      bagType,
      children
    ];

  }));

}

