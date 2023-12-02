use std::io;


fn main() {

    let number_map = [
        ("1", 1),
        ("2", 2),
        ("3", 3),
        ("4", 4),
        ("5", 5),
        ("6", 6),
        ("7", 7),
        ("8", 8),
        ("9", 9),
        ("one", 1),
        ("two", 2),
        ("three", 3),
        ("four", 4),
        ("five", 5),
        ("six", 6),
        ("seven", 7),
        ("eight", 8),
        ("nine", 9),
        ("ten", 10),
    ];

    let lines = io::stdin()
        .lines();
   
    let mut total1:i32 = 0;
    let mut total2:i32 = 0;

    for line in lines {
        let mut first:i32 = -1;
        let mut last:i32 = -1;
        let line_str = line.expect("fail?");

        // This loop was the easiest way to do part 1.
        for c in line_str.bytes() {
            // ASCII codes for 0-9 range
            if c < 48 || c > 57 {
                continue;
            }
            if first == -1 {
                first = (c-48) as i32;
            }
            last = (c-48) as i32;
        }
        // println!("Intermediates {} {} {} {}", line_str, first ,last, total);
        total1+=(first*10)+last;

        // Part 2 loop
        let mut first_index:i32 = -1;
        let mut first_value = 0;
        let mut last_index:i32 = -1;
        let mut last_value = 0;
        
        for (needle, val) in number_map {
            let f_res = line_str.find(needle);
            match f_res {
                None => continue,
                Some(f_val) =>
                    if first_index == -1 || (f_val as i32) < first_index {
                        first_index = f_val as i32;
                        first_value = val;
                    }
            }
            let l_res = line_str.rfind(needle);
            match l_res {
                None => continue,
                Some(r_val) =>
                    if last_index == -1 || (r_val as i32) > last_index {
                        last_index = r_val as i32;
                        last_value = val;
                    }
            }
        }
        total2+=(first_value*10)+last_value;

    }

    println!("Part 1 result: {}", total1);
    println!("Part 2 result: {}", total2);
}
