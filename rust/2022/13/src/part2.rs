use crate::compare_lists;
use serde_json::Value;

pub fn solve(pairs: &Vec<Vec<Value>>) -> usize {
    let mut packets: Vec<Value> = pairs.to_owned()
        .into_iter()
        .flatten()
        .collect();

    // Sort all the packets
    packets.sort_by(|a, b| {
        compare_lists(a.as_array().unwrap(), b.as_array().unwrap())
    });

    // Find the two packet indexes to multiply
    let index1: usize = packets.iter()
        .position(|packet| packet.to_string() == "[[2]]")
        .unwrap();

    let index2: usize = packets.iter()
        .position(|packet| packet.to_string() == "[[6]]")
        .unwrap();

    // Multiply the indexes as 1-based
    (index1 + 1) * (index2 + 1)
}
