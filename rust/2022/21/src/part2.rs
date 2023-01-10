use std::collections::HashMap;
use crate::{get_value, Dynamic, Value};
use crate::Value::{Calc, Change};

pub fn solve(monkeys: &mut HashMap<&str, Value>) -> i64 {
    // Get the 2 monkeys needed for the root value
    let [monkey1, _, monkey2] = match monkeys.get("root").unwrap() {
        Calc(calc) => *calc,
        _ => panic!("Failed to get monkeys for the root value"),
    };

    // One monkey produces a fixed value, the other needs the 'humn' value
    let result: (&str, i64) = match needs_humn(monkeys, monkey1) {
        true => (monkey1, get_value(monkeys, monkey2)),
        false => (monkey2, get_value(monkeys, monkey1)),
    };
    let (check_monkey, compare_with): (&str, i64) = result;

    // Replace the 'humn' value with a dynamic one
    monkeys.insert("humn", Change(Dynamic { value: 0 }));

    let first_outcome: i64 = get_value(monkeys, check_monkey);
    if let Change(humn) = monkeys.get_mut("humn").unwrap() {
        humn.set(10);
    }
    let later_outcome: i64 = get_value(monkeys, check_monkey);
    let outcome_is_increasing: bool = later_outcome > first_outcome;

    // Used for the halving technique to find the right value
    let mut humn_min: i64 = 0;
    let mut humn_max: i64 = compare_with * 5;
    let mut humn_current: i64;
    let mut lowest_correct: i64 = i64::MAX;

    loop {
        if humn_max - humn_min == 1 {
            break lowest_correct;
        }

        humn_current = (humn_min + humn_max) / 2;
        if let Change(humn) = monkeys.get_mut("humn").unwrap() {
            humn.set(humn_current);
        }

        let outcome: i64 = get_value(monkeys, check_monkey);
        if outcome == compare_with {
            lowest_correct = lowest_correct.min(humn_current);
        }

        // Decide whether to keep the lower or upper half
        if compare_with - outcome < 0 {
            match outcome_is_increasing {
                true => humn_max = humn_current,
                false => humn_min = humn_current,
            };
        } else {
            match outcome_is_increasing {
                true => humn_min = humn_current,
                false => humn_max = humn_current,
            };
        }
    }
}

fn needs_humn(monkeys: &HashMap<&str, Value>, monkey: &str) -> bool {
    if let Calc(calculation) = monkeys.get(monkey).unwrap() {
        let [monkey1, _, monkey2]: [&str; 3] = *calculation;

        return monkey1 == "humn"
            || monkey2 == "humn"
            || needs_humn(monkeys, monkey1)
            || needs_humn(monkeys, monkey2)
    }

    false
}
