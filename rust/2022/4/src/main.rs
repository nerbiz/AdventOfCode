mod part1;
mod part2;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;

fn main() {
    let input: Vec<String> = input_as_lines("2022/4/res/input.txt", true);
    let timing: Timing = Timing::start();

    let pairs: Vec<Vec<[i32; 2]>> = input.iter()
        .map(|line| line
            .split(',')
            .map(|pair| {
                let numbers: Vec<i32> = pair
                    .split('-')
                    .map(|number| number.parse::<i32>()
                        .expect("Only numbers are allowed in the ranges"))
                    .collect();

                [numbers[0], numbers[1]]
            })
            .collect()
        )
        .collect();

    println!("Part 1 answer: {}", part1::solve(&pairs));
    println!("Part 2 answer: {}", part2::solve(&pairs));
    timing.output();
}
