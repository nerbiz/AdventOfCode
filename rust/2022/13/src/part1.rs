use serde_json::Value;
use std::cmp::Ordering;
use std::cmp::Ordering::{Equal, Greater, Less};

pub fn solve(pairs: &mut Vec<Vec<Value>>) -> usize {
    pairs.iter_mut()
        .enumerate()
        .filter_map(|(index, pair)| {
            let mut left = pair.drain(..1).next().unwrap();
            let mut right = pair.drain(..1).next().unwrap();

            let result: Ordering = check_lists(
                left.as_array_mut().unwrap(),
                right.as_array_mut().unwrap()
            );

            // Only keep the pairs where the left packet is 'less'
            match result {
                Less => Some(index + 1),
                _ => None,
            }
        })
        .sum()
}

fn check_lists(list1: &mut Vec<Value>, list2: &mut Vec<Value>) -> Ordering {
    // The default is 'continue', only less/greater determine the order
    let mut result = Equal;

    while list1.len() > 0 || list2.len() > 0 {
        // The pair is in order, if the first packet is smaller than the second
        if list1.len() == 0 {
            return Less;
        } else if list2.len() == 0 {
            return Greater;
        }

        // Get the next value from both lists
        let mut left: Value = list1.drain(..1).next().unwrap();
        let mut right: Value = list2.drain(..1).next().unwrap();

        if left.is_array() {
            // Both values are lists
            if right.is_array() {
                result = check_lists(
                    left.as_array_mut().unwrap(),
                    right.as_array_mut().unwrap(),
                );
            }

            // Left is a list, right is a number (convert it to a list)
            else {
                let mut right: Vec<Value> = vec![right];
                result = check_lists(
                    left.as_array_mut().unwrap(),
                    &mut right,
                );
            }
        }

        // Right is a list, left is a number (convert it to a list)
        else if right.is_array() {
            let mut left: Vec<Value> = vec![left];
            result = check_lists(
                &mut left,
                right.as_array_mut().unwrap(),
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
