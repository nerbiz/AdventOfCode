mod part1;
mod part2;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;
use grid::Grid;

fn main() {
    let input: Vec<String> = input_as_lines("2022/23/res/input.txt", true);
    let timing: Timing = Timing::start();
    let expand_size: usize = 55;

    let mut grove: Vec<char> = input.iter()
        .flat_map(|line| {
            // Expand the grove horizontally
            let expanded: String = ".".repeat(expand_size)
                + line
                + &".".repeat(expand_size);

            expanded.chars().collect::<Vec<char>>()
        })
        .collect();

    // Expand the grove vertically
    let row_length: usize = input[0].len() + (2 * expand_size);
    let mut empty_rows: Vec<char> = ".".repeat(row_length * expand_size)
        .chars()
        .collect();
    grove = empty_rows.clone().into_iter().chain(grove).collect();
    grove.append(&mut empty_rows);

    let mut grove: Grid<char> = Grid::from_vec(grove, row_length);

    println!("Part 1 answer: {}", part1::solve(&mut grove.clone()));
    println!("Part 2 answer: {}", part2::solve(&mut grove));
    timing.output();
}
