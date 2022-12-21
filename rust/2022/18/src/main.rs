mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let cubes: Vec<Vec<u32>> = input_as_lines("2022/18/res/input.txt", true)
        .iter()
        .map(|line| {
            line.split(',')
                .map(|number| number.parse().unwrap())
                .collect()
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&cubes));
}
