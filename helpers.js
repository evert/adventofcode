import * as fs from 'node:fs';
export function countSubstr(haystack, needle) {
    return haystack.split(needle).length - 1;
}
export function readInput(noTrim = false) {
    const file = process.env.SAMPLE ? './sampleinput' : './input';
    const data = fs.readFileSync(file, 'utf-8');
    if (noTrim) {
        return data;
    }
    else {
        return data.trim();
    }
}
export function readLines() {
    return readInput().split('\n');
}
export function readInputFields(fieldSeparator = ',') {
    return readInput()
        .split('\n')
        .map(row => row.split(fieldSeparator));
}
/**
 * Reads the input as grid of single-digit numbers.
 */
export function readNumberGrid() {
    return readInput()
        .split('\n')
        .map(row => row
        .split('')
        .map(n => +n));
}
/**
 * Read input as a grid of bytes.
 *
 * Returns a helper class
 *
 * @returns {Grid}
 */
export function readGrid() {
    return new Grid(readInput().split('\n'));
}
/**
 * Given 2 strings, returns a new string with all the characters that appeared
 * in both.
 */
export function commonChars(input1, input2) {
    let out = '';
    for (let i = 0; i < input1.length; i++) {
        if (input2.includes(input1[i])) {
            out += input1[i];
        }
    }
    return out;
}
/**
 * Given an input array, return an array with every possible order of the input array
 */
export function permutations(input, listSoFar = []) {
    const result = [];
    for (const guest of input.values()) {
        const newGuestList = new Set(input);
        newGuestList.delete(guest);
        if (newGuestList.size === 0) {
            result.push([...listSoFar, guest]);
        }
        else {
            result.push(...permutations(Array.from(newGuestList.values()), [...listSoFar, guest]));
        }
    }
    return result;
}
export class Grid {
    constructor(input) {
        this.data = input;
        this.maxY = input.length;
        this.maxX = input[0].length;
    }
    at(x, y) {
        if (x > this.maxX)
            throw new Error('Out of bounds.');
        if (y > this.maxY)
            throw new Error('Out of bounds.');
        return this.data[y][x];
    }
    walk(callback) {
        for (let y = 0; y < this.data.length; y++) {
            for (let x = 0; x < this.data[y].length; x++) {
                callback(this.data[y][x], x, y);
            }
        }
    }
    map(callback) {
        let data = [];
        for (let y = 0; y < this.data.length; y++) {
            let row = '';
            for (let x = 0; x < this.data[y].length; x++) {
                const c = callback(this.data[y][x], x, y);
                if (typeof c !== 'string' || c.length !== 1) {
                    throw new Error('Callback to Grid.map() must return a 1-byte string');
                }
                row += c;
            }
            data.push(row);
        }
        return new Grid(data);
    }
    clone() {
        return new Grid([...this.data]);
    }
    /**
     * Get 8 neighbours as an array.
     *
     * If the cell was on an edge of the grid, fewer items will be returned.
     */
    get8(x, y) {
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return [
            (_a = this.data[y - 1]) === null || _a === void 0 ? void 0 : _a[x - 1],
            (_b = this.data[y - 1]) === null || _b === void 0 ? void 0 : _b[x],
            (_c = this.data[y - 1]) === null || _c === void 0 ? void 0 : _c[x + 1],
            (_d = this.data[y]) === null || _d === void 0 ? void 0 : _d[x + 1],
            (_e = this.data[y + 1]) === null || _e === void 0 ? void 0 : _e[x + 1],
            (_f = this.data[y + 1]) === null || _f === void 0 ? void 0 : _f[x],
            (_g = this.data[y + 1]) === null || _g === void 0 ? void 0 : _g[x - 1],
            (_h = this.data[y]) === null || _h === void 0 ? void 0 : _h[x - 1],
        ].filter(r => r);
    }
    /**
     * Get 4 neighbours as an array.
     *
     * If the cell was on an edge of the grid, fewer items will be returned.
     */
    get4(x, y) {
        var _a, _b, _c, _d;
        return [
            (_a = this.data[y - 1]) === null || _a === void 0 ? void 0 : _a[x],
            (_b = this.data[y]) === null || _b === void 0 ? void 0 : _b[x + 1],
            (_c = this.data[y + 1]) === null || _c === void 0 ? void 0 : _c[x],
            (_d = this.data[y]) === null || _d === void 0 ? void 0 : _d[x - 1],
        ].filter(r => r);
    }
    log() {
        console.log(this.data.join('\n'));
    }
}
