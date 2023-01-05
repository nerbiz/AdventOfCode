mod part1;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let encoded_numbers: Vec<String> = input_as_lines("2022/25/res/input.txt", true);
    let timing: Timing = Timing::start();

    println!("Part 1 answer: {}", part1::solve(&encoded_numbers));
    timing.output();
}
