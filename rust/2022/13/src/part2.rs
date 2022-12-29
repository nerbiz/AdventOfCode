use serde_json::Value;
use std::cmp::Ordering;
use std::cmp::Ordering::{Equal, Greater, Less};

pub fn solve(pairs: &Vec<Vec<Value>>) -> usize {
    let mut packets: Vec<Value> = pairs.to_owned().into_iter().flatten().collect();

    // Sort all the packets
    packets.sort_by(|a, b| {
        check_lists(
            a.as_array().unwrap(),
            b.as_array().unwrap()
        )
    });

    let mut packet_one_index: usize = 0;
    let mut packet_two_index: usize = 0;

    // Find the two packet indexes to multiply
    for (index, packet) in packets.iter().enumerate() {
        if packet.to_string() == "[[2]]" {
            packet_one_index = index + 1;
        } else if packet.to_string() == "[[6]]" {
            packet_two_index = index + 1;
        }

        if packet_one_index != 0 && packet_two_index != 0 {
            break;
        }
    }

    packet_one_index * packet_two_index
}

fn check_lists(list1: &Vec<Value>, list2: &Vec<Value>) -> Ordering {
    let list1 = &mut list1.clone();
    let list2 = &mut list2.clone();

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
