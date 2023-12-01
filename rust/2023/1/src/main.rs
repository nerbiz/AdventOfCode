mod part1;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2023/1/res/input.txt", true);
    let timing: Timing = Timing::start();

    println!("Part 1 answer: {}", part1::solve(&input));
    timing.output();
}
