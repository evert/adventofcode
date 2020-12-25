/**
 * All 26 neighbour offsets coordinates.
 */
const nbList = [

  [-1, -1, -1],
  [-1, -1,  0],
  [-1, -1, +1],

  [-1,  0, -1],
  [-1,  0,  0],
  [-1,  0, +1],

  [-1, +1, -1],
  [-1, +1,  0],
  [-1, +1, +1],


  [ 0, -1, -1],
  [ 0, -1,  0],
  [ 0, -1, +1],

  [ 0,  0, -1],
  // NOT YOU [ 0,  0,  0],
  [ 0,  0, +1],

  [ 0, +1, -1],
  [ 0, +1,  0],
  [ 0, +1, +1],


  [+1, -1, -1],
  [+1, -1,  0],
  [+1, -1, +1],

  [+1,  0, -1],
  [+1,  0,  0],
  [+1,  0, +1],

  [+1, +1, -1],
  [+1, +1,  0],
  [+1, +1, +1],
]


export default class Grid3 {

  data: Set<string>;

  xBound: [number, number];
  yBound: [number, number];
  zBound: [number, number];

  constructor(startStr?: string) {
    this.data = new Set();
    
    this.xBound = [0,0];
    this.yBound = [0,0];
    this.zBound = [0,0];

    if (startStr) this.parse(startStr);

  }

  set(x: number, y:number, z:number, val: boolean) {
    if (val) {
      this.data.add(`${x}-${y}-${z}`);

      // Ugly :P
      if (x<this.xBound[0]) this.xBound[0] = x;
      if (x>this.xBound[1]) this.xBound[1] = x;
      if (y<this.yBound[0]) this.yBound[0] = y;
      if (y>this.yBound[1]) this.yBound[1] = y;
      if (z<this.zBound[0]) this.zBound[0] = z;
      if (z>this.zBound[1]) this.zBound[1] = z;
    } else {
      this.data.delete(`${x}-${y}-${z}`);
    }

  }

  get(x: number, y:number, z:number): boolean {

    return this.data.has(`${x}-${y}-${z}`);

  }

  /**
   * Returns the next iteration of this simulation
   */
  next(): Grid3 {

    const newGrid = new Grid3();
    
    this.travel( (x, y, z, val) => {
      const nb = this.countNeighbours(x, y, z);
      if (val) {
        if (nb === 2 || nb ===3) {
          newGrid.set(x,y,z, true);
        }
      } else {
        if (nb === 3) {
          newGrid.set(x,y,z, true);
        }
      }
    });

    return newGrid;

  }

  /**
   * Basically a 'forEach' for the entire grid.
   *
   * Uses the maximum bounding box+1 in each direction
   */
  travel( cb: (x: number, y:number, z:number, val: boolean) => void) {

    for(let x=this.xBound[0]-1; x <= this.xBound[1]+1; x++) {
      for(let y=this.yBound[0]-1; y <= this.yBound[1]+1; y++) {
        for(let z=this.zBound[0]-1; z <= this.zBound[1]+1; z++) {
          cb(x, y, z, this.get(x, y, z));
        }
      }
    }

  }

  /**
   * Counts the number of neighbours for a given cell.
   *
   */
  countNeighbours(x: number, y: number, z: number): number {

    let n = 0;
    for(const [xd, yd, zd] of nbList) {
      n += this.get(x+xd, y+yd, z+zd) ? 1 : 0;
    }
    return n;

  }

  /**
   * Return the total number of active cells
   */
  countActive(): number {

    return this.data.size;

  }

  render() {

    for(let z=this.zBound[0]; z <= this.zBound[1]; z++) {

      console.log('z=' + z);
      for(let y=this.yBound[0]; y <= this.yBound[1]; y++) {
        let str = '';
        for(let x=this.xBound[0]; x <= this.xBound[1]; x++) {
          str += this.get(x,y,z) ? '#' : '.';
        }
        console.log(str);
      }
      console.log('');

    }

  }

  parse(input: string) {
    let y = 0;
    for(const row of input.trim().split('\n')) {
      
      let x = 0;
      for(const col of row.split('')) {
        this.set(x, y, 0, col==='#');
        x++;
      }

      y++;
    }

  }

}
