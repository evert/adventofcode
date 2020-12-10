const fs = require('fs');
const passports = fs.readFileSync('./input', 'utf-8').split('\n\n');

const requiredFields = [
  'byr',
  'iyr',
  'eyr',
  'hgt',
  'hcl',
  'ecl',
  'pid',
  // 'cid',
];

let validPart1 = 0;
let validPart2 = 0;

passportLoop: for(const lines of passports) {

  const fields = lines.split(/\s/);
  const passport = Object.fromEntries(
    fields.map( field => field.split(':',2))
  );

  for(const requiredField of requiredFields) {
    if (passport[requiredField] === undefined) {
      continue passportLoop;
    }
  }
  validPart1++;

  if (!checkYear(passport.byr, 1920, 2002)) {
    continue passportLoop;
  }
  if (!checkYear(passport.iyr, 2010, 2020)) {
    continue passportLoop;
  }
  if (!checkYear(passport.eyr, 2020, 2030)) {
    continue passportLoop;
  }
  if (!checkHeight(passport.hgt)) {
    continue passportLoop;
  }
  if (!['amb','blu','brn','gry','grn','hzl','oth'].includes(passport.ecl)) {
    continue passportLoop;
  }
  if (!passport.hcl.match(/^#[0-9a-f]{6}$/)) {
    continue passportLoop;
  }
  if (!passport.pid.match(/^[0-9]{9}$/)) {
    continue passportLoop;
  }
  validPart2++;

}

console.log('validPart1', validPart1);
console.log('validPart2', validPart2);

function checkYear(val, min, max) {
  return val >= min && val <= max;
}

function checkHeight(val) {
  const parts = val.match(/^([0-9]{2,3})(cm|in)$/);
  if (!parts) return;

  switch(parts[2]) {
    case 'cm' :
      return parts[1]>=150 && parts[1]<=193;
    case 'in' :
      return parts[1]>=59 && parts[1]<=76;
  }
}

