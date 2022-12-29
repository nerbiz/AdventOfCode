mod part1;
mod part2;
use aoc_utils::input::input_as_lines;
use serde_json::Value;

fn main() {
    let mut input: Vec<String> = input_as_lines("2022/13/res/input.txt", true);

    // Add some extra entries for part 2
    input.push(String::from(""));
    input.push(String::from("[[2]]"));
    input.push(String::from("[[6]]"));

    let pairs_extra: Vec<Vec<Value>> = input
        .split(|line| line.is_empty())
        .map(|pair| {
            vec![
                serde_json::from_str(&pair[0]).unwrap(),
                serde_json::from_str(&pair[1]).unwrap(),
            ]
        })
        .collect();

    let mut pairs: Vec<Vec<Value>> = pairs_extra[..pairs_extra.len()-1]
        .to_owned()
        .into_iter()
        .collect();

    println!("Part 1 answer: {}", part1::solve(&mut pairs));
    println!("Part 2 answer: {}", part2::solve(&pairs_extra));
}
