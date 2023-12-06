use std::io;
use std::io::Lines;
use std::io::StdinLock;
use std::collections::HashSet;
use std::collections::HashMap;

fn main() {
    let lines = io::stdin().lines();
    let (part1_total, part2_total) = parse_cards(lines);

    println!("Part 1 total: {}", part1_total);
    println!("Part 2 total: {}", part2_total);
}

fn parse_cards(lines: Lines<StdinLock<'_>>) -> (usize, usize) {

    let mut part1_total: usize = 0;
    let mut part2_total: usize = 0;

    let mut multipliers: HashMap<usize, usize> = HashMap::new();

    for (idx, line) in lines.enumerate() {

        let card_copies: usize = *multipliers.get(&idx).unwrap_or(&1);
        part2_total += card_copies;
        let mut matches: usize = 0;

        let line_str = line.unwrap();
        let (winning, my) = line_str
            .split(':')
            .nth(1)
            .unwrap()
            .split_once("|")
            .expect("NO");

        let winning_set = nums_to_set(winning);

        for num_str in my.trim().split(' ') {

            if num_str.len() == 0 { continue; } 
            let num: usize = num_str.parse().unwrap();
            if winning_set.contains(&num) {
                matches += 1;
            }
        }
        if matches > 0 {
            part1_total += (2 as usize).pow((matches-1) as u32);
            add_multiplier(
                &mut multipliers,
                idx+1,
                matches,
                card_copies,
            );
        }
    }

    (part1_total, part2_total)

}


fn nums_to_set(input: &str) -> HashSet<usize> {

    let mut hash: HashSet<usize> = HashSet::new();

    for num in input.trim().split(' ') {
        if num.len() == 0 { continue; }
        hash.insert(num.trim().parse().unwrap());
    };

    hash 

}

fn add_multiplier(hash: &mut HashMap<usize,usize>, index: usize, count: usize, add: usize) {

    for i in index..index+count {
        hash.insert(
            i,
            if hash.contains_key(&i) { hash.get(&i).unwrap()+add } else { add+1 }
        );
    }

}
