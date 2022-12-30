mod part1;
mod part2;
use aoc_utils::input::input_as_string;
use aoc_utils::timing::Timing;

fn main() {
    let input: String = input_as_string("2022/1/res/input.txt", true);
    let timing: Timing = Timing::start();

    let elves: Vec<Vec<i32>> = input.split("\n\n")
        .into_iter()
        .map(|elf| elf.split('\n')
            .map(|number| number.parse::<i32>().unwrap())
            .collect()
        )
        .collect();

    println!("Part 1 answer: {}", part1::solve(&elves));
    println!("Part 2 answer: {}", part2::solve(&elves));
    timing.output();
}
