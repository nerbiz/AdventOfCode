mod part1;
mod part2;
use aoc_utils::input::input_as_lines;
use serde_json::Value;
use std::cmp::Ordering;
use std::cmp::Ordering::{Equal, Greater, Less};

fn main() {
    let mut input: Vec<String> = input_as_lines("2022/13/res/input.txt", true);

    // Add some extra entries for part 2
    input.push(String::from(""));
    input.push(String::from("[[2]]"));
    input.push(String::from("[[6]]"));

    let pairs: Vec<Vec<Value>> = input
        .split(|line| line.is_empty())
        .map(|pair| vec![
            serde_json::from_str(&pair[0]).unwrap(),
            serde_json::from_str(&pair[1]).unwrap(),
        ])
        .collect();

    println!("Part 1 answer: {}", part1::solve(&pairs[..pairs.len()-1]));
    println!("Part 2 answer: {}", part2::solve(&pairs));
}

pub fn compare_lists(list1: &Vec<Value>, list2: &Vec<Value>) -> Ordering {
    // The default is 'continue', only less/greater determine the order
    let mut result = Equal;

    // Determine the largest list length to use for the loop
    let max_length = list1.len().max(list2.len());

    for index in 0..max_length {
        // The pair is in order, if the first packet is smaller than the second
        if index == list1.len() {
            return Less;
        } else if index == list2.len() {
            return Greater;
        }

        // Get the next value from both lists
        let (_, left) = list1.split_at(index);
        let left: &Value = left.first().unwrap();
        let (_, right) = list2.split_at(index);
        let right: &Value = right.first().unwrap();

        if left.is_array() {
            // Both values are lists
            if right.is_array() {
                result = compare_lists(
                    left.as_array().unwrap(),
                    right.as_array().unwrap(),
                );
            }

            // Left is a list, right is a number (convert it to a list)
            else {
                let right: Vec<Value> = vec![right.to_owned()];
                result = compare_lists(
                    left.as_array().unwrap(),
                    &right,
                );
            }
        }

        // Right is a list, left is a number (convert it to a list)
        else if right.is_array() {
            let left: Vec<Value> = vec![left.to_owned()];
            result = compare_lists(
                &left,
                right.as_array().unwrap(),
            );
        }

        // Both values are numbers
        else {
            result = left.as_u64().cmp(&right.as_u64());
        }

        if result != Equal {
            break;
        }
    }

    result
}
