mod part1;
mod part2;

use std::collections::HashSet;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/14/res/input.txt", true);

    let mut min_x: usize = usize::MAX;
    let mut max_x: usize = 0;
    let mut max_y: usize = 0;

    let rocks: Vec<Vec<[usize; 2]>> = input.iter()
        .map(|line| line.split(" -> ")
            .map(|point| {
                let location: Vec<usize> = point.split(',')
                    .map(|number| number.parse().unwrap())
                    .collect();

                // Update the min/max values
                min_x = min_x.min(location[0]);
                max_x = max_x.max(location[0]);
                max_y = max_y.max(location[1]);

                // Create the path point as an array
                [location[0], location[1]]
            })
            .collect()
        )
        .collect();

    let mut cave: Vec<Vec<char>> = (0..=max_y)
        .map(|_| ".".repeat(max_x + 2).chars().collect::<Vec<char>>())
        .collect();

    // The locations in the cave that are filled (with rock or sand)
    let mut filled: HashSet<[usize; 2]> = HashSet::new();

    rocks.iter().for_each(|locations| {
        locations.iter()
            .enumerate()
            .for_each(|(index, location)| {
                if index == 0 {
                    return;
                }

                let prev: [usize; 2] = locations[index - 1];

                if location[0] == prev[0] {
                    let from: usize = prev[1].min(location[1]);
                    let to: usize = prev[1].max(location[1]);

                    for y in from..=to {
                        cave[y][location[0]] = '#';
                        filled.insert([location[0], y]);
                    }
                } else {
                    let from = prev[0].min(location[0]);
                    let to = prev[0].max(location[0]);

                    for x in from..=to {
                        cave[location[1]][x] = '#';
                        filled.insert([x, location[1]]);
                    }
                }
            });
    });


    println!("Part 1 answer: {}", part1::solve(&mut cave));
    println!("Part 2 answer: {}", part2::solve(&mut filled, max_y + 2));
}
