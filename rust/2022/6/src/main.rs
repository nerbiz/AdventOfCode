mod part1;
mod part2;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/6/res/input.txt", true);
    let signal: &String = input.first().unwrap();

    println!("Part 1 answer: {}", part1::solve(signal));
    println!("Part 2 answer: {}", part2::solve(signal));
}
