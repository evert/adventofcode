export declare function readGrid(): Grid;

export declare class Grid {

  constructor(input: string[]);
  at(x: number, y:number): string; 
  walk(callback: (val: string, x:number, y:number) => void): void;
  map(callback: (val: string, x:number, y:number) => string): Grid; 
  clone(): Grid;
  get8(x: number, y: number): string[];
  get4(x: number, y: number): string[];
}
