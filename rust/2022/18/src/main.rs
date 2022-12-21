mod part1;
use aoc_utils::input::input_as_lines;

fn main() {
    let mut cubes: Vec<Vec<u32>> = input_as_lines("2022/18/res/input.txt", true)
        .iter()
        .map(|line| {
            let mut coordinates: Vec<u32> = line.split(',')
                .map(|number| number.parse().unwrap())
                .collect();

            // Add the available sides per cube
            coordinates.push(6);
            coordinates
        })
        .collect();

    println!("Part 1 answer: {}", part1::solve(&mut cubes));
}
