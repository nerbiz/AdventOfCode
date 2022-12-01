mod part1;
mod part2;
use aoc_utils::input::input_as_lines;

fn main() {
    let numbers: Vec<i32> = input_as_lines("2021/1/res/input.txt")
        .into_iter()
        .map(|line| line.parse::<i32>()
            .expect("All lines in the input file need to be a valid positive number"))
        .collect();

    println!("Part 1 answer: {}", part1::solve(&numbers));
    println!("Part 2 answer: {}", part2::solve(&numbers));
}
