use std::io;
use std::io::Lines;
use std::io::StdinLock;

struct PartNum { 
    num: isize,
    x: isize,
    y: isize,
    len: isize,
}

struct Symbol {
    x: isize,
    y: isize,
}

fn main() {

    let lines = io::stdin().lines();
    let (parts, symbols) = parse_lines(lines);
    
    let mut part1_total = 0;

    for part in parts.iter() {

        if part_near_any_symbol(part, &symbols) {
            part1_total += part.num;
        }

    }

    println!("Part 1 total {part1_total}");

    let mut part2_total = 0;

    for sym in symbols.iter() {

        part2_total += gear_ratio(sym, &parts);

    }

    println!("Part 2 total {part2_total}");
}


fn part_near_any_symbol(part: &PartNum, symbols: &Vec<Symbol>) -> bool {

    for symbol in symbols.iter() {

        if part_near_symbol(part, symbol) {
            return true;
        }

    }
    return false;

}

fn gear_ratio(symbol: &Symbol, parts: &Vec<PartNum>) -> isize {

    let mut result = 1;
    let mut count = 0;

    for part in parts.iter() {

        if part_near_symbol(part, symbol) { 
            count += 1;
            result = result * part.num;
        }

    }
   
    if count == 2 { result } else { 0 }

}

fn part_near_symbol(part: &PartNum, symbol: &Symbol) -> bool {

    symbol.x >= part.x-1 &&
    symbol.x <= part.x + part.len &&
    symbol.y >= part.y-1 &&
    symbol.y <= part.y+1

}


fn parse_lines(lines: Lines<StdinLock<'_>>) -> (Vec<PartNum>, Vec<Symbol>) {

    let mut p: Vec<PartNum> = Vec::new();
    let mut s: Vec<Symbol> = Vec::new();

    for (y, line) in lines.enumerate() {

        let line_str = line.unwrap();

        let mut collect_digits = String::new();
        for (x, char) in line_str.chars().enumerate() {

            if char.is_ascii_digit() {
                collect_digits.push(char);
                continue;
            }
            if collect_digits.len() > 0 {
                p.push(PartNum {
                    num: collect_digits.parse().expect("YOW"),
                    x: (x-(collect_digits.len())) as isize,
                    y: y as isize,
                    len: collect_digits.len() as isize,
                });
                collect_digits.clear();
            }
            if char == '.' {
                continue;
            }

            s.push(Symbol {
                x: x as isize,
                y: y as isize,
            });

        }
        if collect_digits.len() > 0 {
            // This line ended with a digit
            p.push(PartNum {
                num: collect_digits.parse().expect("YOW"),
                x: (line_str.len()-(collect_digits.len())) as isize,
                y: y as isize,
                len: collect_digits.len() as isize,
            });
        }

    }

    return (p, s);

}
