use crate::compare_lists;
use serde_json::Value;
use std::cmp::Ordering;
use std::cmp::Ordering::Less;

pub fn solve(pairs: &[Vec<Value>]) -> usize {
    pairs.iter()
        .enumerate()
        .filter_map(|(index, pair)| {
            let (left, right) = pair.split_first().unwrap();
            let right = right.first().unwrap();

            let result: Ordering = compare_lists(
                left.as_array().unwrap(),
                right.as_array().unwrap()
            );

            // Keep the 1-based index if the pair is in order
            match result {
                Less => Some(index + 1),
                _ => None,
            }
        })
        .sum()
}
