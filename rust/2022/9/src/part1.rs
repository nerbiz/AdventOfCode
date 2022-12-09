use std::collections::HashSet;

struct Rope {
    head: [i32; 2],
    tail: [i32; 2],
}

impl Rope {
    fn is_connected(&self) -> bool {
        let distance: u32 = self.head[0].abs_diff(self.tail[0])
            + self.head[1].abs_diff(self.tail[1]);

        distance == 0
        || distance == 1
        || (
            // If both X and Y are different and distance is 2,
            // they are diagonally connected
            distance == 2
            && self.head[0] != self.tail[0]
            && self.head[1] != self.tail[1]
        )
    }

    fn tail_string(&self) -> String {
        format!("{},{}", self.tail[0], self.tail[1])
    }
}

pub fn solve(steps: &Vec<(&str, i32)>) -> usize {
    let mut rope = Rope {
        head: [0, 0],
        tail: [0, 0],
    };

    let mut visited: HashSet<String> = HashSet::new();
    visited.insert(rope.tail_string());

    for (direction, amount) in steps {
        for _i in 0..*amount {
            match *direction {
                "U" => rope.head[1] -= 1,
                "R" => rope.head[0] += 1,
                "D" => rope.head[1] += 1,
                "L" => rope.head[0] -= 1,
                _ => (),
            }

            if !rope.is_connected() {
                // Change X and Y by -1, 0 or 1
                let x_diff: i32 = rope.head[0].cmp(&rope.tail[0]) as i32;
                let y_diff: i32 = rope.head[1].cmp(&rope.tail[1]) as i32;
                rope.tail[0] += x_diff;
                rope.tail[1] += y_diff;

                visited.insert(rope.tail_string());
            }
        }
    }

    visited.len()
}
