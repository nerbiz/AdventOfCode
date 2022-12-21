mod rock;
mod part1;
use crate::rock::Rock;
use aoc_utils::input::input_as_lines;

fn main() {
    let input: Vec<String> = input_as_lines("2022/17/res/input.txt", true);

    let directions: Vec<i8> = input.first().unwrap()
        .chars()
        .map(|char| if char == '<' { -1 } else { 1 })
        .collect();

    let rocks: Vec<Rock> = input_as_lines("2022/17/res/rocks.txt", true)
        .split(|line| line.is_empty())
        .map(|slice| Rock::from(slice))
        .collect();

    // Allocate enough room for the tower, each row will be 16 bits (9 used)
    // 2022 rocks need to fall, with an estimated average of 3 rows per rock
    let mut tower: Vec<u16> = Vec::with_capacity(3*2022);

    // Add a floor to the tower
    tower.push((1 << 9) - 1);

    println!("Part 1 answer: {}", part1::solve(&mut tower, &directions, &rocks));
}
