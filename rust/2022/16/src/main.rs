mod part1;
use std::collections::HashMap;
use regex::{Captures, Regex};
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

#[derive(Debug)]
pub struct Valve {
    name: String,
    flow_rate: u32,
    tunnels: Vec<String>,
}

fn main() {
    let input: Vec<String> = input_as_lines("2022/16/res/input.txt", true);
    let timing: Timing = Timing::start();
    let regex: Regex = Regex::new(r"([A-Z]{2}).*rate=(\d+).*valves? (.+)").unwrap();

    // Collect flow rates, used for sorting the valves
    let mut flow_rates: HashMap<String, u32> = HashMap::new();

    let mut valves: Vec<Valve> = input.iter()
        .map(|line| {
            let matches: Captures = regex.captures(line).unwrap();

            let name: String = matches[1].to_string();
            let flow_rate: u32 = matches[2].parse().unwrap();
            let tunnels: Vec<String> = matches[3].split(", ")
                .map(|name| name.to_string())
                .collect();

            flow_rates.insert(name.clone(), flow_rate);

            Valve { name, flow_rate, tunnels }
        })
        .collect();

    // Sort the tunnels of each valve by highest flow rate
    valves.iter_mut().for_each(|valve| {
        valve.tunnels.sort_by(|a, b| {
            let a: &u32 = flow_rates.get(a).unwrap();
            let b: &u32 = flow_rates.get(b).unwrap();
            b.cmp(a)
        });
    });

    println!("Part 1 answer: {}", part1::solve(&valves));
    timing.output();
}
