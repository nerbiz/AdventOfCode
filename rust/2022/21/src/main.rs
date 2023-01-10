mod part1;
mod part2;
use std::collections::HashMap;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;
use crate::Value::{Calc, Change, Num};

#[derive(Clone, Debug)]
pub struct Dynamic {
    value: i64,
}

impl Dynamic {
    fn current(&self) -> i64 {
        self.value
    }

    fn set(&mut self, value: i64) {
        self.value = value
    }
}

#[derive(Clone, Debug)]
pub enum Value<'a> {
    Num(i64),
    Calc([&'a str; 3]),
    Change(Dynamic),
}

fn main() {
    let input: Vec<String> = input_as_lines("2022/21/res/input.txt", true);
    let timing: Timing = Timing::start();

    let mut monkeys: HashMap<&str, Value> = input.iter()
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
    println!("Part 2 answer: {}", part2::solve(&mut monkeys));
    timing.output();
}

pub fn get_value(monkeys: &HashMap<&str, Value>, monkey: &str) -> i64 {
    match monkeys.get(monkey).unwrap() {
        Num(number) => *number,
        Change(value) => value.current(),
        Calc(calculation) => {
            let [monkey1, operator, monkey2]: [&str; 3] = *calculation;
            let monkey1: i64 = get_value(monkeys, monkey1);
            let monkey2: i64 = get_value(monkeys, monkey2);

            match operator {
                "+" => monkey1 + monkey2,
                "-" => monkey1 - monkey2,
                "/" => monkey1 / monkey2,
                "*" | _ => monkey1 * monkey2,
            }
        }
    }
}
