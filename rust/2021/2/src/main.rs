mod part1;
mod part2;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2021/2/res/input.txt", true);
    let commands: Vec<(&str, i32)> = input.iter()
        .map(|line| {
            let parts: (&str, &str) = line.split_once(' ').unwrap();
            (parts.0, parts.1.parse::<i32>()
                .expect("Each line needs to end with a digit"))
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&commands));
    println!("Part 2 answer: {}", part2::solve(&commands));
}
