mod part1;
mod part2;
use aoc_utils::input_lines;

fn main() {
    let numbers: Vec<u32> = input_lines("2021/1/res/input.txt")
        .into_iter()
        .map(|line| line.parse::<u32>()
            .expect("All lines in the input file need to be a valid positive number"))
        .collect();

    println!("Part 1 answer: {}", part1::solve(&numbers));
    println!("Part 2 answer: {}", part2::solve(&numbers));
}
