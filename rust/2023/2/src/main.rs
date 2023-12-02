mod part1;
mod part2;
mod game;
use aoc_utils::input::input_as_lines;
use aoc_utils::timing::Timing;
use crate::game::Game;

fn main() {
    let input: Vec<String> = input_as_lines("2023/2/res/input.txt", true);
    let timing: Timing = Timing::start();

    let games: Vec<Game> = input
        .iter()
        .map(|line| Game::from_string(line))
        .collect();

    println!("Part 1 answer: {}", part1::solve(&games));
    println!("Part 2 answer: {}", part2::solve(&games));
    timing.output();
}
