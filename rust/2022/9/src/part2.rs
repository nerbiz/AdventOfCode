use std::collections::HashSet;

pub fn solve(steps: &Vec<(&str, i32)>) -> usize {
    let mut rope: Vec<[i32; 2]> = Vec::new();
    for _i in 0..10 {
        rope.push([0, 0]);
    }

    let mut visited: HashSet<String> = HashSet::new();
    visited.insert(tail_string(&rope));

    for (direction, amount) in steps {
        for _i in 0..*amount {
            // Move the head
            let head: &mut [i32; 2] = rope.first_mut().unwrap();
            match *direction {
                "U" => head[1] -= 1,
                "R" => head[0] += 1,
                "D" => head[1] += 1,
                "L" => head[0] -= 1,
                _ => (),
            }

            // Move each part of the body according to the previous part
            for i in 1..rope.len() {
                let (left, right) = rope.split_at_mut(i);
                let knot: &mut [i32; 2] = right.get_mut(0).unwrap();
                let prev_knot: &[i32; 2] = left.last().unwrap();

                if !is_connected(knot, prev_knot) {
                    // Change X and Y by -1, 0 or 1
                    let x_diff: i32 = prev_knot[0].cmp(&knot[0]) as i32;
                    let y_diff: i32 = prev_knot[1].cmp(&knot[1]) as i32;
                    knot[0] += x_diff;
                    knot[1] += y_diff;
                }
            }

            visited.insert(tail_string(&rope));
        }
    }

    visited.len()
}

fn tail_string(rope: &Vec<[i32; 2]>) -> String {
    let tail: &[i32; 2] = rope.last().unwrap();
    format!("{},{}", tail[0], tail[1])
}

fn is_connected(knot: &[i32; 2], other: &[i32; 2]) -> bool {
    let distance: u32 = knot[0].abs_diff(other[0])
        + knot[1].abs_diff(other[1]);

    distance == 0
        || distance == 1
        || (
        // If both X and Y are different and distance is 2,
        // they are diagonally connected
        distance == 2
            && knot[0] != other[0]
            && knot[1] != other[1]
    )
}
