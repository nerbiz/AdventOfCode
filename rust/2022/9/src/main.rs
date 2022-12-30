mod part1;
mod part2;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2022/9/res/input.txt", true);
    let timing: Timing = Timing::start();

    let steps: Vec<(&str, i32)> = input.iter()
        .map(|line| {
            let parts: Vec<&str> = line.split(' ').collect::<Vec<&str>>();

            (parts[0], parts[1].parse::<i32>().expect("Steps need to be a valid number"))
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&steps));
    println!("Part 2 answer: {}", part2::solve(&steps));
    timing.output();
}
