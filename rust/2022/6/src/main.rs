mod part1;
mod part2;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2022/6/res/input.txt", true);
    let timing: Timing = Timing::start();
    let signal: &String = input.first().unwrap();

    println!("Part 1 answer: {}", part1::solve(signal));
    println!("Part 2 answer: {}", part2::solve(signal));
    timing.output();
}
