mod part1;
use aoc_utils::input::input_as_lines;
use regex::Regex;
use std::collections::HashMap;
use aoc_utils::timing::Timing;

fn main() {
    let input = input_as_lines("2022/19/res/input-test.txt", true);
    let timing: Timing = Timing::start();

    let regex = Regex::new(r"Each ([a-z]+?) .+?(\d+) ([a-z]+)(?: and (\d+) ([a-z]+))?").unwrap();

    let blueprints: Vec<HashMap<&str, HashMap<&str, u8>>> = input
        .iter()
        .map(|line| {
            let mut blueprint: HashMap<&str, HashMap<&str, u8>> = HashMap::new();

            // Loop over all the robot cost definitions of the line
            for result in regex.captures_iter(line) {
                let name: &str = result.get(1).unwrap().as_str();
                let mut costs: HashMap<&str, u8> = HashMap::from([(
                    result.get(3).unwrap().as_str(),
                    result.get(2).unwrap().as_str().parse().unwrap(),
                )]);

                // Add extra costs, if they exist
                if let Some(amount) = result.get(4) {
                    costs.insert(
                        result.get(5).unwrap().as_str(),
                        amount.as_str().parse().unwrap()
                    );
                }

                blueprint.insert(name, costs);
            }

            blueprint
        })
        .collect();

    println!("{:#?}", blueprints);

    println!("Part 1 answer: {}", part1::solve(&input));
    timing.output();
}
