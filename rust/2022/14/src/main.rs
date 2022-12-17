mod part1;
mod part2;
use std::collections::HashSet;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/14/res/input.txt", true);

    // The locations in the cave that are filled (with rock or sand)
    let mut filled: HashSet<[usize; 2]> = HashSet::new();

    // The highest Y coordinate of the cave
    let mut max_y: usize = 0;

    input.iter()
        .for_each(|line| {
            let mut previous: Vec<usize> = Vec::new();

            line.split(" -> ")
                .for_each(|point| {
                    let current: Vec<usize> = point.split(',')
                        .map(|number| number.parse().unwrap())
                        .collect();

                    max_y = max_y.max(current[1]);

                    if !previous.is_empty() {
                        if current[0] == previous[0] {
                            let from: usize = previous[1].min(current[1]);
                            let to: usize = previous[1].max(current[1]);

                            for y in from..=to {
                                filled.insert([current[0], y]);
                            }
                        } else {
                            let from: usize = previous[0].min(current[0]);
                            let to: usize = previous[0].max(current[0]);

                            for x in from..=to {
                                filled.insert([x, current[1]]);
                            }
                        }
                    }

                    previous = current;
                });
        });

    println!("Part 1 answer: {}", part1::solve(&mut filled.clone(), &max_y));
    println!("Part 2 answer: {}", part2::solve(&mut filled, &(max_y + 2)));
}
