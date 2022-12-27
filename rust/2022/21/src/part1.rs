use std::collections::HashMap;
use crate::Value;
use crate::Value::{Calc, Num};

pub fn solve(monkeys: &HashMap<&str, Value>) -> u64 {
    get_num(monkeys, "root")
}

fn get_num(monkeys: &HashMap<&str, Value>, monkey: &str) -> u64 {
    match monkeys.get(monkey).unwrap() {
        Num(number) => *number,
        Calc(calculation) => {
            let [monkey1, operator, monkey2] = *calculation;
            let monkey1: u64 = get_num(monkeys, monkey1);
            let monkey2: u64 = get_num(monkeys, monkey2);

            match operator {
                "+" => monkey1 + monkey2,
                "-" => monkey1 - monkey2,
                "/" => monkey1 / monkey2,
                "*" | _ => monkey1 * monkey2,
            }
        }
    }
}
