mod part1;
use aoc_utils::input::input_as_lines;
use serde_json::Value;

fn main() {
    let input: Vec<String> = input_as_lines("2022/13/res/input.txt", true);

    let mut pairs: Vec<Vec<Value>> = input
        .split(|line| line.is_empty())
        .map(|pair| {
            vec![
                serde_json::from_str(&pair[0]).unwrap(),
                serde_json::from_str(&pair[1]).unwrap(),
            ]
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&mut pairs));
}
