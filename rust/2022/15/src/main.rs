mod part1;

use std::collections::HashSet;
use aoc_utils::input::input_as_lines;
use fancy_regex::Regex;

#[derive(Debug)]
pub struct Sensor {
    x: i32,
    y: i32,
    distance: u32,
}

fn main() {
    let mut input: Vec<String> = input_as_lines("2022/15/res/input.txt", true);

    let regex: Regex = Regex::new(r"[xy]=(-?\d+)").unwrap();
    let target_row: i32 = input.drain(..1).next().unwrap()
        .split(' ').last().unwrap()
        .parse().unwrap();
    let mut beacons_at_target: HashSet<[i32; 2]> = HashSet::new();

    let sensors: Vec<Sensor> = input.iter()
        .map(|line| {
            let mut numbers: Vec<i32> = Vec::new();
            for result in regex.captures_iter(line) {
                numbers.push(result.unwrap()[1].parse().unwrap());
            }

            if numbers[3] == target_row {
                beacons_at_target.insert([numbers[2], numbers[3]]);
            }

            Sensor {
                x: numbers[0],
                y: numbers[1],
                distance: numbers[0].abs_diff(numbers[2])
                    + numbers[1].abs_diff(numbers[3]),
            }
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&sensors, beacons_at_target.len(), target_row));
}
