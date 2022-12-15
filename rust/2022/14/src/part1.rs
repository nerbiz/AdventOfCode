pub fn solve(cave: &mut Vec<Vec<char>>) -> u32 {
    // Stop looping, when a sand unit reaches this y-coordinate
    let stop_at_y: usize = cave.len() - 1;

    // The amount of sand units that have come to rest
    let mut at_rest_amount: u32 = 0;

    'new: loop {
        // The origin of each sand unit
        let mut location: [usize; 2] = [500, 0];

        'fall: loop {
            // Move 1 step down, stop if it overflows
            location[1] += 1;
            if location[1] == stop_at_y {
                break 'new;
            }

            let [x, y]: [usize; 2] = location;
            if cave[y + 1][x] != '.' {
                // See if the sand unit can move diagonally
                if cave[y + 1][x - 1] == '.' {
                    location[0] -= 1;
                    continue 'fall;
                } else if cave[y + 1][x + 1] == '.' {
                    location[0] += 1;
                    continue 'fall;
                }

                // Otherwise the sand unit comes to rest
                cave[y][x] = 'o';
                at_rest_amount += 1;
                continue 'new;
            }
        }
    }

    at_rest_amount
}
