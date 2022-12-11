// mod part1;
mod part2;
use aoc_utils::input::input_as_lines;

#[derive(Debug)]
pub struct Monkey {
    levels: Vec<u64>,
    operation: Vec<String>,
    divider: u64,
    next: Vec<usize>,
}

fn main() {
    let mut input: Vec<String> = input_as_lines("2022/11/res/input.txt", false);
    let mut monkeys: Vec<Monkey> = Vec::new();

    while input.len() > 0 {
        let lines: Vec<String> = input.drain(..=6).collect();

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

        monkeys.push(Monkey { levels, operation, divider, next });
    }

    // println!("Part 1 answer: {}", part1::solve(&mut monkeys));
    println!("Part 2 answer: {}", part2::solve(&mut monkeys));
}
