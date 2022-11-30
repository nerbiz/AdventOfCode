mod part1;
mod part2;
use aoc_utils::input_lines;

fn main() {
    let input = input_lines("2021/1/res/input-test.txt");

    println!("Part 1 answer: {}", part1::solve(&input));
    println!("Part 2 answer: {}", part2::solve(&input));
}
