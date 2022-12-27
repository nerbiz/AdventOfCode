mod part1;
use std::collections::HashMap;
use aoc_utils::input::input_as_lines;
use crate::Value::{Calc, Num};

#[derive(Debug)]
pub enum Value<'a> {
    Num(u64),
    Calc([&'a str; 3]),
}

fn main() {
    let input: Vec<String> = input_as_lines("2022/21/res/input.txt", true);

    let monkeys: HashMap<&str, Value> = input.iter()
        .map(|line| {
            let (monkey, value) = line.split_once(": ").unwrap();

            (
                monkey,
                match value.parse() {
                    Ok(number) => Num(number),
                    Err(_) => {
                        let calc: Vec<&str> = value.split(' ').collect();
                        Calc([calc[0], calc[1], calc[2]])
                    },
                }
            )
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&monkeys));
}
