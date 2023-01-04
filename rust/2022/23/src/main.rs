mod part1;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2022/23/res/input.txt", true);
    let timing: Timing = Timing::start();
    let expand_size: usize = 10;

    let mut grove: Vec<Vec<char>> = input.iter()
        .map(|line| {
            // Expand the grove horizontally
            let expanded = ".".repeat(expand_size)
                + line
                + &".".repeat(expand_size);

            expanded.chars().collect()
        })
        .collect();

    // Expand the grove vertically
    let mut empty_line: Vec<char> = grove.first().unwrap().clone();
    empty_line.fill('.');
    for _i in 0..expand_size {
        grove.insert(0, empty_line.clone());
        grove.push(empty_line.clone());
    }

    println!("Part 1 answer: {}", part1::solve(&mut grove));
    timing.output();
}
