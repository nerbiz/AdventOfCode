mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/10/res/input.txt");

    let instructions: Vec<(&str, i32)> = input.iter()
        .map(|line| {
            let parts: Vec<&str> = line.split(' ').collect();

            if let Some(amount) = parts.get(1) {
                (parts[0], amount.parse().unwrap())
            } else {
                (parts[0], 0)
            }
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&instructions));
}
