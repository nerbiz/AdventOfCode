mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let input = input_as_lines("2022/8/res/input.txt");

    let rows: Vec<Vec<u32>> = input.iter()
        .map(|line| line.chars()
            .map(|number|
                number.to_digit(10).expect("All characters need to be numbers")
            )
            .collect()
        )
        .collect();

    println!("Part 1 answer: {}", part1::solve(&rows));
}
