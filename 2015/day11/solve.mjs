const input = 'vzbxkghb';
let output = input;

console.log(input);

let found = 0;
while(true) {

  output = increaseString(output);

  if (!checkStraightLine(output)) {
    // console.log(output + ' -> no straight');
    continue;
  }
  if (!checkBadChars(output)) {
    console.log(output + ' -> bad chars');
    continue;
  }
  if (!checkDoubles(output)) {
    // console.log(output + ' -> no doubles');
    continue;
  }

  console.log(output + ' -> found');
  found++;
  if (found === 2) break;
}

function increaseString(str) {

  let code = str.at(-1).charCodeAt();
  const start = str.slice(0, -1);

  let newChar = String.fromCharCode(code+1);
  if (newChar==='i' || newChar==='o' || newChar==='l') {
    newChar = String.fromCharCode(code+2); 
  }

  if (newChar === '{') {
    return increaseString(start) + 'a'; 
  } else {
    return start + newChar;
  }

}
function checkStraightLine(input) {

  for(let i=0; i < input.length-2; i++) {

    const codes = [
      input.charCodeAt(i),
      input.charCodeAt(i+1),
      input.charCodeAt(i+2),
    ];
    if (codes[1]-codes[0] === 1 && codes[2]-codes[0] === 2) {
      return true;
    }

  }
  return false;

}
function checkBadChars(input) {

  return !input.match(/[iol]/);

}
function checkDoubles(input) {

  let found = 0;

  for(let i=0; i < input.length-1; i++) {

    if (input[i] === input[i+1]) {
      found++;
      i++;
    }

  }
  return found>=2;

}
