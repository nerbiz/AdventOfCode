use std::collections::HashSet;

pub fn solve(filled: &mut HashSet<[usize; 2]>, floor_y: &usize) -> u32 {
    // The amount of sand units that have come to rest
    let mut at_rest_amount: u32 = 0;

    'new: loop {
        // The origin of each sand unit
        let mut location: [usize; 2] = [500, 0];

        // See if the source is blocked
        if filled.contains(&[499, 1])
            && filled.contains(&[500, 1])
            && filled.contains(&[501, 1])
        {
            filled.insert(location);
            at_rest_amount += 1;
            break;
        }

        'fall: loop {
            let [x, y]: [usize; 2] = location;

            if &(y + 1) == floor_y {
                filled.insert(location);
                at_rest_amount += 1;
                continue 'new;
            }

            // See if the sand unit hits something, and then can move diagonally
            if filled.contains(&[x, y + 1]) {
                let down_left: [usize; 2] = [x - 1, y + 1];
                if !filled.contains(&down_left) {
                    location = down_left;
                    continue 'fall;
                }

                let down_right: [usize; 2] = [x + 1, y + 1];
                if !filled.contains(&down_right) {
                    location = down_right;
                    continue 'fall;
                }

                // Otherwise the sand unit comes to rest
                filled.insert(location);
                at_rest_amount += 1;
                continue 'new;
            }

            // Move the sand unit down
            location[1] += 1;
        }
    }

    at_rest_amount
}
