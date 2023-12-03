use std::io;
use std::cmp;

/**
 * Represents a single draw with 3 sets of dice in RGB order
 */
type Draw = (u32, u32, u32); 

/**
 * Represents a game with up to 10 draws. If there were fewer than 10 draws the remaining draws
 * will just be empty.
 */
type Game = [Draw;10];


fn main() {

    let lines = io::stdin()
        .lines();

    let mut idx = 0;
    let mut part1_total = 0;
    let mut part2_total = 0;
    for line in lines {

        idx += 1;
        let game = parse_game(line.expect("WOW"));
        if is_legal_game(game) {
            part1_total += idx;
        }
        let game_limits = find_limits(game);
        part2_total += cube_power(game_limits);

    }

    println!("Part 1 total: {}", part1_total);
    println!("Part 2 total: {}", part2_total);
}


fn parse_game(line: String) -> Game {

    let mut parts = line.split(':'); 
    let draws = parts.nth(1).expect("hey").split(";");

    let mut res = [(0,0,0); 10];
    let mut draw_num = 0;

    for draw in draws {

        draw_num += 1;
        let mut r = 0;
        let mut g = 0;
        let mut b = 0;
        let cubes = draw.split(", ");

        for cube in cubes {

            let mut cub_parts = cube.trim().split(" ");
            let count:u32 = cub_parts.next().expect("Oh no").trim().parse().expect("OK");
            let color = cub_parts.next();

            match color {
                Some("blue") => b+=count,
                Some("green") => g+=count,
                Some("red") => r+=count,
                _ => panic!("FUCK"),
            }
                

        }
        res[draw_num] = (r,g,b);

    }

    res

}

fn is_legal_game(game: Game) -> bool {

    const MAX:Draw = (12, 13, 14);

    for draw in game {

        if draw.0>MAX.0 || draw.1>MAX.1 || draw.2>MAX.2 {
            return false;
        }

    }
    return true;

}

fn find_limits(game: Game) -> Draw {

    let mut limit_draw:Draw = (0, 0, 0);
    for draw in game {
        limit_draw.0 = cmp::max(limit_draw.0, draw.0);
        limit_draw.1 = cmp::max(limit_draw.1, draw.1);
        limit_draw.2 = cmp::max(limit_draw.2, draw.2);
    }

    limit_draw 

}

fn cube_power(draw: Draw) -> u32 {

    return draw.0 * draw.1 * draw.2;

}
