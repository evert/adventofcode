import { readFileSync } from 'fs';

type Rule = {
  bagType: string,
  children: Record<string, number>
}

type RuleMap: Record<string, Record<string, number>>;

const rules: Rule[] = parseRules();

function findParents(bagType:string): string[] {

  const result = new Set<string>();
  for(const rule of rules) {
    if (rule.children[bagType] !== undefined) {
      result.add(rule.bagType);
      for(const foo of findParents(rule.bagType)) {
        result.add(foo);
      }
    }
  }

  return Array.from(result);

}

function countChildren(bagType: string): number {

  let count = 0;
  return count;

}


console.log('Part 1', findParents('shiny gold').length);
console.log('Part 2', countChildren('shiny gold'));


function parseRules(): Rule[] {
  const lines = readFileSync('./input', 'utf-8').trimEnd().split('\n');

  return lines.map(line => {
    const [, bagType, childrenStr] = line.match(/^(.*) bags contain (.*)$/)!;

    const children: Record<string, number> = {};

    if (childrenStr !== 'no other bags.') {
      for(const childStr of childrenStr.split(',')) {
        const [, num, bagType] = childStr.trim().match(/^([0-9])+ (.*) bags?.?$/)!;
        children[bagType] = parseInt(num, 10);
      };
    }

    return {
      bagType,
      children
    };
      
  });

}

