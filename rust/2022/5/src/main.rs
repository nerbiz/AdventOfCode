mod part1;
mod part2;
use aoc_utils::input::input_as_string;
use std::collections::HashMap;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_string("2022/5/res/input.txt", false)
        .split("\n\n")
        .map(|str| str.to_owned())
        .collect();
    let timing: Timing = Timing::start();

    // Create a <stack, crates> hashmap
    let mut stacks: HashMap<usize, Vec<String>> = HashMap::new();
    input[0].split('\n').rev().for_each(|line| {
        // Group all characters by index, where index is the position in the line
        line.chars().enumerate().for_each(|(index, character)| {
            if character.is_alphabetic() {
                stacks.entry(index)
                    .or_insert(Vec::new())
                    .push(character.to_string());
            }
        });
    });

    // Keep only the crates, sorted by stack indexes
    let mut stacks: Vec<(usize, Vec<String>)> = stacks.into_iter().collect();
    stacks.sort_by(|a, b| a.0.cmp(&b.0));
    let mut stacks: Vec<Vec<String>> = stacks.into_iter()
        .map(|(_, contents)| contents.to_owned())
        .collect();

    let steps: Vec<[usize; 3]> = input[1].trim()
        .split('\n')
        .map(|line| {
            // Keep only the numbers of each line
            let numbers: Vec<usize> = line
                .split(' ')
                .filter_map(|part| part.parse().ok())
                .collect();

            // Make the stack indexes 0-based
            [numbers[0], numbers[1] - 1, numbers[2] - 1]
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&mut stacks.clone(), &steps));
    println!("Part 2 answer: {}", part2::solve(&mut stacks, &steps));
    timing.output();
}
