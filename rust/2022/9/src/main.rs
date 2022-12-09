mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let input = input_as_lines("2022/9/res/input.txt");

    let steps: Vec<(&str, i32)> = input.iter()
        .map(|line| {
            let parts: Vec<&str> = line.split(' ').collect::<Vec<&str>>();

            (parts[0], parts[1].parse::<i32>().expect("Steps need to be a valid number"))
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&steps));
}
