const fs = require('fs');

const lines = fs
  .readFileSync('./input', 'utf-8')
  .trim()
  .split('\n');

let part1 = 0;
let part2 = 0;

for(const line of lines) {

  const [samples, output] = line.split('|').map(
    part => part
      .trim()
      .split(' ')
      .map(
        item => item.split('').sort().join('')
      )
  );

  /**
   * @type Map<number, string>
   */
  const digitMap = new Map();
  const sampleSet = new Set(samples);

  while(digitMap.size < 10) {

    for(const sample of sampleSet) {

      switch(sample.length) {

        case 2:
          digitMap.set(1, sample);
          sampleSet.delete(sample);
          break;
        case 3:
          digitMap.set(7, sample);
          sampleSet.delete(sample);
          break;
        case 4:
          digitMap.set(4, sample);
          sampleSet.delete(sample);
          break;
        case 5:
          if (digitMap.has(2) && digitMap.has(3)) {
            digitMap.set(5, sample);
            sampleSet.delete(sample);
          }
          if (
            commonChars(sample, digitMap.get(1))===1
            && commonChars(sample, digitMap.get(7))===2
            && commonChars(sample, digitMap.get(4))===2
          ) {
            if (digitMap.has(2)) throw new Error('dupe');
            digitMap.set(2, sample);
            sampleSet.delete(sample);
          }
          if (
            commonChars(sample, digitMap.get(1))===2
            && commonChars(sample, digitMap.get(7))===3
            && commonChars(sample, digitMap.get(4))===3
            && commonChars(sample, digitMap.get(2))===4
          ) {
            if (digitMap.has(3)) throw new Error('dupe');
            digitMap.set(3, sample);
            sampleSet.delete(sample);
          }

          break;
        case 6:
          if (digitMap.has(6) && digitMap.has(0)) {
            digitMap.set(9, sample);
            sampleSet.delete(sample);
          }
          if (
            commonChars(sample, digitMap.get(1))===2
            && commonChars(sample, digitMap.get(7))===3
            && commonChars(sample, digitMap.get(4))===3
          ) {
            if (digitMap.has(0)) throw new Error('dupe');
            digitMap.set(0, sample);
            sampleSet.delete(sample);
          }
          if (
            commonChars(sample, digitMap.get(1))===1
            && commonChars(sample, digitMap.get(7))===2
            && commonChars(sample, digitMap.get(4))===3
          ) {
            if (digitMap.has(6)) throw new Error('dupe');
            digitMap.set(6, sample);
            sampleSet.delete(sample);
          }
          break;
        case 7:
          digitMap.set(8, sample);
          sampleSet.delete(sample);
          break;
      }

    }

  }
  const number = output.map(n => convertDigit(digitMap, n).toString()).join('');
  part1 +=
    substrCount(number, 1) +
    substrCount(number, 4) +
    substrCount(number, 7) +
    substrCount(number, 8);

  part2 += +number;

}

console.log('Part 1: %d', part1);
console.log('Part 2: %d', part2);

function commonChars(sample1, sample2) {

  if (!sample1 || !sample2) return 0;

  let result = 0;
  for(const c of sample1) {
    if (sample2.includes(c)) {
      result++;
    }
  }
  return result;

}

function convertDigit(digitMap, n) {

  const dm = new Map(Array.from(digitMap.entries()).map(([k, v]) => [v,k]));
  if (!dm.has(n)) {
    console.log(dm);
    throw new Error(`${n} did not appear in map`);
  }
  return dm.get(n);

}

function substrCount(haystack, needle) {

  return haystack.split(needle).length - 1;

}
