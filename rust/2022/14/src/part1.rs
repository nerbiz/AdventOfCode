use std::collections::HashSet;

pub fn solve(filled: &mut HashSet<[usize; 2]>, max_y: &usize) -> u32 {
    // The amount of sand units that have come to rest
    let mut at_rest_amount: u32 = 0;

    'new: loop {
        // The origin of each sand unit
        let mut location: [usize; 2] = [500, 0];

        'fall: loop {
            // Move 1 step down, stop if it overflows
            location[1] += 1;
            if &location[1] == max_y {
                break 'new;
            }

            let [x, y]: [usize; 2] = location;

            // See if the sand unit hits something, and then can move diagonally
            if filled.contains(&[x, y + 1]) {
                if !filled.contains(&[x - 1, y + 1]) {
                    location[0] -= 1;
                    continue 'fall;
                }

                if !filled.contains(&[x + 1, y + 1]) {
                    location[0] += 1;
                    continue 'fall;
                }

                // Otherwise the sand unit comes to rest
                filled.insert(location);
                at_rest_amount += 1;
                continue 'new;
            }
        }
    }

    at_rest_amount
}
