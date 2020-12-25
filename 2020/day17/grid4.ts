/**
 * All 80 neighbour offsets coordinates.
 */
const nbList = [

  // w=-1
  [-1, -1, -1, -1],
  [-1, -1, -1,  0],
  [-1, -1, -1, +1],

  [-1, -1,  0, -1],
  [-1, -1,  0,  0],
  [-1, -1,  0, +1],

  [-1, -1, +1, -1],
  [-1, -1, +1,  0],
  [-1, -1, +1, +1],


  [-1,  0, -1, -1],
  [-1,  0, -1,  0],
  [-1,  0, -1, +1],

  [-1,  0,  0, -1],
  [-1,  0,  0,  0],
  [-1,  0,  0, +1],

  [-1,  0, +1, -1],
  [-1,  0, +1,  0],
  [-1,  0, +1, +1],


  [-1, +1, -1, -1],
  [-1, +1, -1,  0],
  [-1, +1, -1, +1],

  [-1, +1,  0, -1],
  [-1, +1,  0,  0],
  [-1, +1,  0, +1],

  [-1, +1, +1, -1],
  [-1, +1, +1,  0],
  [-1, +1, +1, +1],

  // w=0
  [ 0, -1, -1, -1],
  [ 0, -1, -1,  0],
  [ 0, -1, -1, +1],

  [ 0, -1,  0, -1],
  [ 0, -1,  0,  0],
  [ 0, -1,  0, +1],

  [ 0, -1, +1, -1],
  [ 0, -1, +1,  0],
  [ 0, -1, +1, +1],


  [ 0,  0, -1, -1],
  [ 0,  0, -1,  0],
  [ 0,  0, -1, +1],

  [ 0,  0,  0, -1],
  // NOT YOU [ 0,  0,  0,  0],
  [ 0,  0,  0, +1],

  [ 0,  0, +1, -1],
  [ 0,  0, +1,  0],
  [ 0,  0, +1, +1],


  [ 0, +1, -1, -1],
  [ 0, +1, -1,  0],
  [ 0, +1, -1, +1],

  [ 0, +1,  0, -1],
  [ 0, +1,  0,  0],
  [ 0, +1,  0, +1],

  [ 0, +1, +1, -1],
  [ 0, +1, +1,  0],
  [ 0, +1, +1, +1],

  // w=1
  [ +1, -1, -1, -1],
  [ +1, -1, -1,  0],
  [ +1, -1, -1, +1],

  [ +1, -1,  0, -1],
  [ +1, -1,  0,  0],
  [ +1, -1,  0, +1],

  [ +1, -1, +1, -1],
  [ +1, -1, +1,  0],
  [ +1, -1, +1, +1],


  [ +1,  0, -1, -1],
  [ +1,  0, -1,  0],
  [ +1,  0, -1, +1],

  [ +1,  0,  0, -1],
  [ +1,  0,  0,  0],
  [ +1,  0,  0, +1],

  [ +1,  0, +1, -1],
  [ +1,  0, +1,  0],
  [ +1,  0, +1, +1],


  [ +1, +1, -1, -1],
  [ +1, +1, -1,  0],
  [ +1, +1, -1, +1],

  [ +1, +1,  0, -1],
  [ +1, +1,  0,  0],
  [ +1, +1,  0, +1],

  [ +1, +1, +1, -1],
  [ +1, +1, +1,  0],
  [ +1, +1, +1, +1],
]


export default class Grid4 {

  data: Set<string>;

  xBound: [number, number];
  yBound: [number, number];
  zBound: [number, number];
  wBound: [number, number];

  constructor(startStr?: string) {
    this.data = new Set();
    
    this.xBound = [0,0];
    this.yBound = [0,0];
    this.zBound = [0,0];
    this.wBound = [0,0];

    if (startStr) this.parse(startStr);

  }

  set(x: number, y:number, z:number, w: number, val: boolean) {
    if (val) {
      this.data.add(`${x}-${y}-${z}-${w}`);

      // Ugly :P
      if (x<this.xBound[0]) this.xBound[0] = x;
      if (x>this.xBound[1]) this.xBound[1] = x;
      if (y<this.yBound[0]) this.yBound[0] = y;
      if (y>this.yBound[1]) this.yBound[1] = y;
      if (z<this.zBound[0]) this.zBound[0] = z;
      if (z>this.zBound[1]) this.zBound[1] = z;
      if (w<this.wBound[0]) this.wBound[0] = w;
      if (w>this.wBound[1]) this.wBound[1] = w;
    } else {
      this.data.delete(`${x}-${y}-${z}-${w}`);
    }

  }

  get(x: number, y:number, z:number, w: number): boolean {

    return this.data.has(`${x}-${y}-${z}-${w}`);

  }

  /**
   * Returns the next iteration of this simulation
   */
  next(): Grid4 {

    const newGrid = new Grid4();
    
    this.travel( (x, y, z, w, val) => {
      const nb = this.countNeighbours(x, y, z, w);
      if (val) {
        if (nb === 2 || nb ===3) {
          newGrid.set(x,y,z, w, true);
        }
      } else {
        if (nb === 3) {
          newGrid.set(x,y,z, w, true);
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
  travel( cb: (x: number, y:number, z:number, w: number, val: boolean) => void) {

    for(let x=this.xBound[0]-1; x <= this.xBound[1]+1; x++) {
      for(let y=this.yBound[0]-1; y <= this.yBound[1]+1; y++) {
        for(let z=this.zBound[0]-1; z <= this.zBound[1]+1; z++) {
          for(let w=this.wBound[0]-1; w <= this.wBound[1]+1; w++) {
            cb(x, y, z, w, this.get(x, y, z, w));
          }
        }
      }
    }

  }

  /**
   * Counts the number of neighbours for a given cell.
   *
   */
  countNeighbours(x: number, y: number, z: number, w: number): number {

    let n = 0;
    for(const [xd, yd, zd, wd] of nbList) {
      n += this.get(x+xd, y+yd, z+zd, w+wd) ? 1 : 0;
      // We can stop counting at 5
      if (n>4) return n;
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

    for(let w=this.wBound[0]; w <= this.wBound[1]; w++) {
      for(let z=this.zBound[0]; z <= this.zBound[1]; z++) {

        console.log('z=' + z + ', w=' + w);
        for(let y=this.yBound[0]; y <= this.yBound[1]; y++) {
          let str = '';
          for(let x=this.xBound[0]; x <= this.xBound[1]; x++) {
            str += this.get(x,y,z, w) ? '#' : '.';
          }
          console.log(str);
        }
        console.log('');

      }

    }

  }

  parse(input: string) {
    let y = 0;
    for(const row of input.trim().split('\n')) {
      
      let x = 0;
      for(const col of row.split('')) {
        this.set(x, y, 0, 0, col==='#');
        x++;
      }

      y++;
    }

  }

}
