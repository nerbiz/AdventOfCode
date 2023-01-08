mod part1;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2022/20/res/input.txt", true);
    let timing: Timing = Timing::start();

    // Create (index, value) tuples
    let original: Vec<(usize, isize)> = input.iter()
        .enumerate()
        .map(|(index, line)| (index, line.parse().unwrap()))
        .collect();

    println!("Part 1 answer: {}", part1::solve(&original));
    timing.output();
}
