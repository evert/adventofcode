import * as fs from 'node:fs';

export function countSubstr(haystack: string, needle: string): number {

  return haystack.split(needle).length -1;

}

export function readInput(noTrim: boolean = false): string {

  const file = process.env.SAMPLE ? './sampleinput' : './input';
  const data= fs.readFileSync(file, 'utf-8');
  if (noTrim) {
    return data;
  } else {
    return data.trim();
  }

}

export function readLines(): string[] {

  return readInput().split('\n');

}

export function readInputFields(fieldSeparator = ','): string[][] {

  return readInput()
    .split('\n')
    .map(row => row.split(fieldSeparator));

}

/**
 * Reads the input as grid of single-digit numbers.
 */
export function readNumberGrid(): number[][] {

  return readInput()
    .split('\n')
    .map(row =>
      row
        .split('')
        .map(n => +n)
    );
}

/**
 * Read input as a grid of bytes.
 *
 * Returns a helper class
 *
 * @returns {Grid}
 */
export function readGrid(): Grid {

  return new Grid(
    readInput().split('\n')
  );

}


/**
 * Given 2 strings, returns a new string with all the characters that appeared
 * in both.
 */
export function commonChars(input1:string, input2:string): string {

  let out = '';
  for(let i=0; i<input1.length; i++){
    if (input2.includes(input1[i])) {
      out+=input1[i];
    }
  }
  return out;

}

/**
 * Given an input array, return an array with every possible order of the input array
 */
export function permutations<T>(input: T[], listSoFar: T[] = []): T[][] {

  const result = [];
  for(const guest of input.values()) {

    const newGuestList = new Set(input);
    newGuestList.delete(guest);
    if (newGuestList.size === 0) {
      result.push([...listSoFar, guest]);
    } else {
      result.push(...permutations(Array.from(newGuestList.values()), [...listSoFar, guest]));
    }

  }
  return result;

}

export class Grid {

  private data: string[];
  maxY: number;
  maxX: number;

  constructor(input: string[]) {
    this.data = input;
    this.maxY = input.length;
    this.maxX = input[0].length;
  }


  at(x: number, y: number): string {
   
    if (x>this.maxX) throw new Error('Out of bounds.');
    if (y>this.maxY) throw new Error('Out of bounds.');
    return this.data[y][x];

  }

  walk(callback: (val: string, x: number, y: number) => void): void {

    for(let y=0; y<this.data.length; y++) {
      for(let x=0; x<this.data[y].length; x++) {
        callback(this.data[y][x], x, y);
      }
    }
  }

  map(callback: (val:string, x:number, y:number)=>string): Grid {

    let data = [];

    for(let y=0; y<this.data.length; y++) {
      let row = '';
      for(let x=0; x<this.data[y].length; x++) {
        const c = callback(this.data[y][x], x, y);
        if (typeof c !== 'string' || c.length !== 1) {
          throw new Error('Callback to Grid.map() must return a 1-byte string');
        }
        row+=c;
      }
      data.push(row);
    }

    return new Grid(data);

  }

  set(x: number, y: number, c:string) {

    if (typeof c !== 'string' || c.length !== 1) {
      throw new Error('Cell format must be a 1-byte string');
    }
    const row = this.data[y];
    const start = row.substr(0, x);
    const end = row.substr(x+1);
    this.data[y] = start + c + end;

  }

  clone(): Grid {

    return new Grid([...this.data]);

  }

  /**
   * Get 8 neighbours as an array.
   *
   * If the cell was on an edge of the grid, fewer items will be returned.
   */
  get8(x: number, y:number): string[] {

    return [
      this.data[y-1]?.[x-1],
      this.data[y-1]?.[x],
      this.data[y-1]?.[x+1],
      this.data[y]?.[x+1],
      this.data[y+1]?.[x+1],
      this.data[y+1]?.[x],
      this.data[y+1]?.[x-1],
      this.data[y]?.[x-1],
    ].filter(r => r);

  }

  /**
   * Get 4 neighbours as an array.
   *
   * If the cell was on an edge of the grid, fewer items will be returned.
   */
  get4(x: number, y: number): string[] {

    return [
      this.data[y-1]?.[x],
      this.data[y]?.[x+1],
      this.data[y+1]?.[x],
      this.data[y]?.[x-1],
    ].filter(r => r);

  }

  log() {
    
    console.log(this.data.join('\n'));

  }

}
