mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/6/res/input.txt");
    let signal: &String = input.first().unwrap();

    println!("Part 1 answer: {}", part1::solve(&signal));
}
