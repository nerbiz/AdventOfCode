mod part1;
mod part2;
use aoc_utils::input::input_as_lines;

#[derive(Debug, Clone)]
pub struct Monkey {
    levels: Vec<u64>,
    operation: Vec<String>,
    divider: u64,
    next: Vec<usize>,
}

fn main() {
    let input: Vec<String> = input_as_lines("2022/11/res/input.txt", true);

    let mut monkeys: Vec<Monkey> = input
        .split(|line| line.is_empty())
        .map(|lines| {
            let levels: Vec<u64> = lines[1].split(": ").last().unwrap()
                .split(", ")
                .map(|number| number.parse().unwrap())
                .collect();

            let operation: Vec<String> = lines[2].split(" = old ").last().unwrap()
                .split(' ')
                .map(|part| part.to_owned())
                .collect();

            let divider: u64 = lines[3].split(' ').last().unwrap().parse().unwrap();

            let next: Vec<usize> = lines[4..=5].iter()
                .map(|line| line.split(' ').last().unwrap().parse().unwrap())
                .rev()
                .collect();

            Monkey { levels, operation, divider, next }
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&mut monkeys.clone()));
    println!("Part 2 answer: {}", part2::solve(&mut monkeys));
}
