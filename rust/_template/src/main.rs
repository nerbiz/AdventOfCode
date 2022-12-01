mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let input = input_as_lines("20xx/x/res/input-test.txt");

    println!("Part 1 answer: {}", part1::solve(&input));
}
